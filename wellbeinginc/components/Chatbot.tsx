'use client'
import React, { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js"
import './Chatbot.css';

type ChatbotProps = {
  userID: string;
  userRole: string;
}

const Chatbot = (props: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x : window.innerWidth - 150, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0});
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [queueStatus, setQueueStatus] = useState(false);
  const [queuePos, setQueuePos] = useState();

  const senderID = props.userID;
  const [receiverID, setReceiverID] = useState();

  const toggleChatbot = () => {
    const duration = endTime - startTime;
    if (duration < 100) {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
  };

  const handleMouseDown = e => {
    setStartTime(Date.now());
    setIsDragging(true);
    setOffset({x: e.clientX - position.x, y: e.clientY - position.y});
  };

  const handleMouseUp = () => {
    setEndTime(Date.now());
    setIsDragging(false);
  };

  const handleMouseMove = e => {
    if (isDragging) {
      setPosition({x: e.clientX - offset.x, y: e.clientY - offset.y});
    }
  };

  useEffect(() => {
    fetchMessage();

    const messageChannel = supabase.channel('ChatbotMessages').on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
      },
      (payload) => {
        fetchMessage();
        console.log("Fetching")

        if (payload.receiver_id = senderID) {
          setReceiverID(payload.sender_id)
        }
      }
    ).subscribe()

    return () => {
      supabase.removeChannel(messageChannel);
    };
  }, []);

  useEffect(() => {
    const queueChannel = supabase.channel('ChatbotQueue').on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
      },
      () => {
        checkQueue();
      }
    ).subscribe()

    return () => {
      supabase.removeChannel(queueChannel);
    }
  })

  const fetchMessage = async () => {
    const { data, error } = await supabase
      .from('ChatbotMessages')
      .select()
      .or(`(sender_id.eq.${senderID}.and.receiver_id.eq.${receiverID}), (sender_id.eq.${receiverID}.and.receiver_id.eq.${senderID})`);

    if (error) {
      console.error('Error fethcing messages:', error.message);
    } else {
      setMessages(data);
    }
  };

  const handleSendMessage = async () => {
    const { data, error } = await supabase.from('ChatbotMessages').insert([
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
  }

  const joinQueue = async () => {
    const { data, error } = await supabase.from('ChatbotQueue').insert([
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
    const { data, error } = await supabase.from('ChatbotQueue').delete().eq('user_id', senderID);
    setQueueStatus(false);

    if (error) {
      console.log('Error removing from queue')
      setQueueStatus(true);
    }
  }

  const checkQueue = async () => {
    const { data, error } = await supabase.from('ChatbotQueue').select().eq('user_id', senderID);

    if (error) {
      console.log("Error getting queue status");
    } else {
      if (data.length > 0) {
        setQueueStatus(true);
  
        const { data: posInQueue, error: posInQueueError } = await supabase
          .from('ChatbotQueue')
          .select('*', { count: 'exact', head: true })
          .lt('queue_id', data[0].queue_id);
  
        if (posInQueueError) {
          console.log("Error getting queue position")
        } else {
          console.log(posInQueue + " test")
          setQueuePos(posInQueue);
        }
      } else {
        setQueueStatus(false);
      }
    }
  }

  const acceptConnection = async () => {
    const { data, error } = await supabase.from('ChatbotQueue').select('*').limit(1);

    if (error) {
      console.log("Error selecting from queue")
    } else {
      const { error:deleteError } = await supabase.from('ChatbotQueue').delete().eq('user_id', data[0].user_id);
    }
    setReceiverID(data[0].user_id);
  }

  return (
    <div className={`chatbot ${isOpen ? 'open' : ''}`} style={{ left: position.x, top: position.y}} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown}>
      <button onClick={toggleChatbot} className="toggle-button">
        Toggle Chatbot
      </button>
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
            <button onClick={acceptConnection}>Accept</button>
          ):(<p></p>)}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;