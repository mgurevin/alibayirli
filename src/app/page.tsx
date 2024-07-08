"use client";
import React, { useState } from 'react';
import styles from './page.module.css';
import LeftSection from './components/LeftSection';
import RightSection from './components/RightSection';

interface Chat {
  id: number;
  chatName: string;
  response: string;
}

export default function Home() {
  const [chats, setChats] = useState<Chat[]>([]);

  const addChat = (chat: Chat) => {
    setChats([...chats, chat]);
  };

  return (
    <div className={styles.mainpage}>
      <div className={styles.leftOut}>
        <LeftSection allChats={chats} />
      </div>
      <div className={styles.rightOut}>
        <RightSection addChat={addChat} />
      </div>
    </div>
  );
}
