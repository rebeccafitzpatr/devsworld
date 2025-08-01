import { useEffect, useState, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
export interface ChatMessage {
  user: string;
  message: string;
}

export function useQuestionChat(questionId: string | undefined) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const isConnected = useRef(false);

  useEffect(() => {
    if (!questionId) return;
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://devsworld-enffcyd7dnabewb3.australiasoutheast-01.azurewebsites.net/chathub')
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    return () => {
      newConnection.stop();
    };
  }, [questionId]);

  useEffect(() => {
    if (connection && questionId && !isConnected.current) {
      connection.start().then(async () => {
        isConnected.current = true;
        await connection.invoke('JoinQuestionRoom', questionId);
        // Fetch previous messages
        const previousMessages = await connection.invoke('GetMessages', questionId);
        if (Array.isArray(previousMessages)) {
          setMessages(previousMessages.map((m: any) => ({ user: m.user, message: m.message })));
        }
        connection.on('ReceiveMessage', (user: string, message: string) => {
          setMessages(prev => [...prev, { user, message }]);
        });
      });
    }
    return () => {
      connection?.off('ReceiveMessage');
    };
  }, [connection, questionId]);

  const sendMessage = async (user: string, message: string) => {
    if (connection && questionId) {
      await connection.invoke('SendMessage', questionId, user, message);
    }
  };

  return { messages, sendMessage };
}