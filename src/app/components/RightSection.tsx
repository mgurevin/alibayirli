"use client";
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/RightSection.module.css';
import chatgptlogo from '../assets/chatgptlogo.png';
import chatgptlogo2 from '../assets/chatgptlogo2.png';
import nouserlogo from '../assets/nouserlogo.png';
import Image from 'next/image';

const openAiAPI = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

interface Message {
  role: string;
  content: string;
}

interface Chat {
  id: number;
  chatName: string;
  response: string;
}

interface RightSectionProps {
  addChat: (chat: Chat) => void;
}

const RightSection: React.FC<RightSectionProps> = ({ addChat }) => {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  const sendMessage = async () => {
    const url = "https://api.openai.com/v1/chat/completions";
    const token = `Bearer ${openAiAPI}`;
    const model = 'gpt-3.5-turbo';

    const messagesToSend: Message[] = [
      ...allMessages,
      { role: 'user', content: message }
    ];

    try {
      const res = await axios.post(url, {
        model,
        messages: messagesToSend
      }, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });

      const resjson = res.data;
      if (resjson) {
        const newAllMessages: Message[] = [
          ...messagesToSend,
          resjson.choices[0].message
        ];

        setAllMessages(newAllMessages);
        setMessage('');

        addChat({
          id: Date.now(),
          chatName: message,
          response: resjson.choices[0].message.content
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className={styles.rightSection}>
      <div className={styles.chatGptVersion}>
        <p className={styles.text1}>ChatGPT 3.5</p>
      </div>

      {allMessages.length > 0 ? (
        <div className={styles.messages}>
          {allMessages.map((msg, index) => (
            <div key={index} className={styles.message}>
              <Image src={msg.role === 'user' ? nouserlogo : chatgptlogo2} width={50} height={50} alt="" />
              <div className={styles.details}>
                <h2>{msg.role === 'user' ? 'You' : 'ChatGPT'}</h2>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noChat}>
          <div className={styles.s1}>
            <Image src={chatgptlogo} alt='chatgpt' height={70} width={70} />
            <h1>How can I help you today?</h1>
          </div>
          <div className={styles.s2}>
            <div className={styles.suggestionCard}>
              <h2>Recommend activities</h2>
              <p>psychology behind decision-making</p>
            </div>
            <div className={styles.suggestionCard}>
              <h2>Recommend activities</h2>
              <p>psychology behind decision-making</p>
            </div>
            <div className={styles.suggestionCard}>
              <h2>Recommend activities</h2>
              <p>psychology behind decision-making</p>
            </div>
            <div className={styles.suggestionCard}>
              <h2>Recommend activities</h2>
              <p>psychology behind decision-making</p>
            </div>
          </div>
        </div>
      )}

      <div className={styles.bottomSection}>
        <div className={styles.messageBar}>
          <input 
            type="text" 
            placeholder='Message ChatGPT...' 
            onChange={(e) => setMessage(e.target.value)} 
            value={message} 
            onKeyDown={handleKeyDown} 
          />
          <svg 
            onClick={sendMessage} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <p>ChatGPT can make mistakes. Consider checking important informations.</p>
      </div>
    </div>
  );
}

export default RightSection;
