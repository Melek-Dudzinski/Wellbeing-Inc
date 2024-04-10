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
  const [position, setPosition] = useState({ x : window.innerWidth / 2 - 150, y: window.innerHeight / 2 - 200  });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0});

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [queueStatus, setQueueStatus] = useState(false);
  const [queuePos, setQueuePos] = useState();
  const [connected, setConnected] = useState(false);

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

  const handleReceiverID = async () => {
    if (props.userRole == "Regular") {
      const { data: connectionData, error} = await SupabaseClient()
        .from('ChatbotConnections')
        .select()
        .eq('regular_id', senderID);

      if (error) {
        console.log("Error getting regular connection")
      } else {
        if (connectionData.length == 1) {
          console.log("setting id")
          setReceiverID(connectionData.champion_id);
        }
      }
    }
  }

  useEffect(() => {
    fetchMessage();
    console.log("Fetching")
  }, [receiverID])

  useEffect(() => {
    const messageChannel = ChatbotMessagesUpdates(handleReceiverID, fetchMessage)

    return () => {
      SupabaseClient().removeChannel(messageChannel);
    };
  }, [receiverID]);

  useEffect(() => {
    const queueChannel = SupabaseClient().channel('ChatbotQueue').on(
      'postgres_changes',
      {
        event: '*',
        table: 'ChatbotQueue',
      },
      () => {
        checkQueue();
      }
    ).subscribe()

    return () => {
      SupabaseClient().removeChannel(queueChannel);
    }
  }, [])

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
      console.log("no connection")
    }
    
  }

  const joinQueue = async () => {
    const { data, error } = await SupabaseClient()
      .from('ChatbotQueue')
      .insert([
      {
        user_id: senderID,
      }
    ]);
    setQueueStatus(true);

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
        console.log("data")
        setQueueStatus(true);
  
        const { data: posInQueue, error: posInQueueError, count } = await SupabaseClient()
          .from('ChatbotQueue')
          .select('queue_id', { count: 'exact' })
          .lt('queue_id', data[0].queue_id);
  
        if (posInQueueError) {
          console.log("Error getting queue position")
        } else {
          setQueuePos(count + 1);
        }
      } else {
        console.log("no data")
        setQueueStatus(false);
      }
    }
    handleReceiverID()
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
      setReceiverID(data[0].user_id);

      if (!connected) {
        const { data: connecting, error } = await SupabaseClient()
        .from('ChatbotConnections')
        .insert([
          {
            champion_id: senderID,
            regular_id: data[0].user_id,
          }
        ]);
  
        if (error) {
          console.error('Error adding to connections');
        }
      } else {
        const { data: updating, error } = await SupabaseClient()
          .from('ChatbotConnections')
          .update({ regular_id: data[0].user_id});
  
        if (error) {
          console.error('Error updating connections');
        }
      }
    }
  }

  const leaveConnection = async () => {
    const { data: leaving, error } = await SupabaseClient().
      from('ChatbotConnections')
      .delete()
      .eq('champion_id', senderID);

    if (error) {
      console.error('Error leaving connections');
    } else {
      setReceiverID("");
    }
  }

  const checkConnection = async () => {
    if (props.userRole == "Regular") {
      console.log("regular")
      const { data, error } = await SupabaseClient()
        .from('ChatbotConnections')
        .select()
        .eq('regular_id', senderID);

      if (error) {
        console.log("Error getting regular connection");
      } else {
        if (data.length > 0) {
          console.log("connected")
          setConnected(true);
          handleReceiverID();
        }
      }
    } else {
      const { data, error } = await SupabaseClient()
        .from('ChatbotConnections')
        .select()
        .eq('champion_id', senderID);

      if (error) {
        console.log("Error getting Champion connection");
      } else {
        if (data.length > 0) {
          console.log("connected")
          setConnected(true);
          handleReceiverID();
        }
      }
    }
  }

  function ChatbotMessagesUpdates(handleReceiverID: () => Promise<void>, fetchMessage: () => Promise<void>) {
    return SupabaseClient().channel('ChatbotMessages').on(
      'postgres_changes',
      {
        event: 'INSERT',
        table: "ChatbotMessages",
      },
      () => {
        console.log("test")
        handleReceiverID();
        fetchMessage();
      }
    ).subscribe();
  }

  if (!queueStatus && !firstLoad) {
    setLoad(true);
    checkQueue();
    checkConnection();
    console.log("queue change")
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
              <button onClick={acceptConnection}>Accept</button>
              <button onClick={leaveConnection}>Leave</button>
            </div>
          ):(<p></p>)}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;