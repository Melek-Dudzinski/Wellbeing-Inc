'use client'
import React, { useEffect, useState } from 'react';
import SupabaseClient from '@/components/Supabase';
import './Chatbot.css';

type ChatbotProps = {
  userID: string;
  userRole: string;
  isOpen: boolean;  
}

const Chatbot = (props: ChatbotProps) => {
  const [position, setPosition] = useState({ x : window.innerWidth / 2 - 150, y: window.innerHeight / 2 - 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0});

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [queueStatus, setQueueStatus] = useState(false);
  const [queuePos, setQueuePos] = useState();
  const [queueTotal, setQueueTotal] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState("Status: Please join the queue");

  const senderID = props.userID;
  const [receiverID, setReceiverID] = useState();

  const [firstLoad, setLoad] = useState(false);

  const handleMouseDown = e => {
    setIsDragging(true);
    setOffset({x: e.clientX - position.x, y: e.clientY - position.y});
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = e => {
    if (isDragging) {
      setPosition({x: e.clientX - offset.x, y: e.clientY - offset.y});
    }
  };

  useEffect(() => {
    fetchMessage();
    if (receiverID) {
      setStatus("Connected")
    }
  }, [receiverID]);
  

  useEffect(() => {
    const messageChannel = ChatbotMessagesUpdates(senderID, receiverID, setReceiverID, fetchMessage)

    return () => {
      SupabaseClient().removeChannel(messageChannel);
    };
  }, [receiverID]);

  useEffect(() => {
    checkQueue()
  }, [queueStatus])

  useEffect(() => {
    return ChatbotQueueUpdates(checkQueue);
  }, [queueStatus])

  const fetchMessage = async () => {
    if (receiverID) {
      const { data, error } = await SupabaseClient()
      .from('ChatbotMessages')
      .select()
      .or(`sender_id.eq.${senderID}, sender_id.eq.${receiverID}`)
      .or(`receiver_id.eq.${receiverID}, receiver_id.eq.${senderID}`);

    if (error) {
      console.error('Error fethcing messages:', error.message);
    } else {
      setMessages(data);
    }
    }
  };

  const handleSendMessage = async () => {

    if (receiverID) {
      const { data, error } = await SupabaseClient()
        .from('ChatbotMessages')
        .insert([
        {
          sender_id: senderID,
          receiver_id: receiverID,
          content: newMessage,
          timestamp: new Date().toISOString(),
        },
        ]);
  
      if (error) {
        console.error('Error sending message:', error.message);
      } else {
        setNewMessage("");
        fetchMessage();
      }
    } else {
      setErrorMessage("You are not connected to a champion. Please join the queue and wait.")
    }
    
  }

  const joinQueue = async () => {
    setErrorMessage("")
    const { data, error } = await SupabaseClient()
      .from('ChatbotQueue')
      .insert([
      {
        user_id: senderID,
      }
    ]);
    setQueueStatus(true);
    setStatus("Status: In queue")

    if (error) {
      console.error('Error adding to queue');
      setQueueStatus(false);
    }

    checkQueue();
  }

  const leaveQueue = async () => {
    const { data, error } = await SupabaseClient()
      .from('ChatbotQueue')
      .delete()
      .eq('user_id', senderID);
    setQueueStatus(false);
    setStatus("Status: Please join the queue")

    if (error) {
      console.log('Error removing from queue')
      setQueueStatus(true);
    }
  }

  const checkQueue = async () => {
    const { data, error } = await SupabaseClient()
      .from('ChatbotQueue')
      .select()
      .eq('user_id', senderID);

    if (error) {
      console.log("Error getting queue status");
    } else {
      if (data.length > 0) {
        setQueueStatus(true);
  
        const { data: posInQueue, error: posInQueueError, count: posCount } = await SupabaseClient()
          .from('ChatbotQueue')
          .select('queue_id', { count: 'exact' })
          .lt('queue_id', data[0].queue_id);

        const { data: totalQueue, error: totalQueueError, count: totalCount } = await SupabaseClient()
          .from('ChatbotQueue')
          .select('*', { count: 'exact' });
  
        if (posInQueueError || totalQueueError) {
          console.log("Error getting queue position")
        } else {
          console.log(totalCount)
          setQueuePos(posCount + 1);
          setQueueTotal(totalCount);
        }
      } else {
        setQueueStatus(false);
      }
    }
  }

  const acceptConnection = async () => {
    const { data, error } = await SupabaseClient()
    .from('ChatbotQueue')
    .select('*')
    .limit(1);

    if (error) {
      console.log("Error selecting from queue")
    } else {
      const { error:deleteError } = await SupabaseClient()
      .from('ChatbotQueue')
      .delete()
      .eq('user_id', data[0].user_id);
    }
    setReceiverID(data[0].user_id);
  }

  function ChatbotMessagesUpdates(senderID: string, receiverID: undefined, setReceiverID: React.Dispatch<React.SetStateAction<undefined>>, fetchMessage: () => Promise<void>) {
    return SupabaseClient().channel('ChatbotMessages').on(
        'postgres_changes',
        {
            event: 'INSERT',
            table: "ChatbotMessages",
        },
        (payload) => {
            if (payload.new.receiver_id === senderID && !receiverID) {
                setReceiverID(payload.new.sender_id);
            } else {
                fetchMessage();
            }
        }
    ).subscribe();
  }

  function ChatbotQueueUpdates(checkQueue: () => Promise<void>) {
    const queueChannel = SupabaseClient().channel('ChatbotQueue').on(
      'postgres_changes',
      {
        event: '*',
        table: 'ChatbotQueue',
      },
      () => {
        checkQueue();
      }
    ).subscribe();
  
    return () => {
      SupabaseClient().removeChannel(queueChannel);
    };
  }

  if (!queueStatus && !firstLoad) {
    setLoad(true);
    checkQueue();
  }

  return (
    <div className={`chatbot ${props.isOpen ? 'open' : ''}`} style={{ left: position.x, top: position.y}} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown}>
      <div className="chatbot-window">
        <div className='messages'>
          {messages.map(message => (
            <div key={message.message_id} className={`message ${message.receiver_id === senderID ? 'receiverStyle' : 'senderStyle'}`}>
              <p>{message.content}</p>
            </div>
          ))}
        </div>
        <div className='message-input'>
          <input type="text" placeholder='Type your message...' value={newMessage} onChange={e => setNewMessage(e.target.value)} />
          <button onClick={handleSendMessage} >Send</button>
          {queueStatus ? (
            <div>
              <button onClick={leaveQueue} >Leave</button>
              <p>Position in queue {queuePos}</p>
            </div>
          ) : (
            <button onClick={joinQueue} >Join</button>
          )}
          {props.userRole !== "Regular" ? (
            <div>
              {/* <p>People in queue: {queueTotal}</p> */}
              <button onClick={acceptConnection}>Accept</button>
            </div>
          ):(<p></p>)}
          {errorMessage}
          {status}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
