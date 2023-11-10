import firestore from '@react-native-firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import { useAuth } from '@app/context/auth';

const chatsCollection = firestore().collection('Chats');

export const ChatScreen = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = chatsCollection.onSnapshot(q => {
      const messages: any = [];

      q.forEach(doc => {
        console.log('doc: ', doc.data());
        messages.push({
          _id: doc.data()._id,
          text: doc.data().text,
          createdAt: doc.data().createdAt,
          user: doc.data().user,
        });
      });

      setMessages(messages);
    });

    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );

    const { _id, createdAt, text, user } = messages[0];
    chatsCollection.add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={messages => onSend(messages)}
      user={{
        _id: user?.uid,
      }}
    />
  );
};
