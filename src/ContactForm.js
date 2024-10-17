import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore'; // Firestore methods for v9
import { db } from './firebaseConfig'; // Firebase configuration
import axios from 'axios';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Firebase Firestore mein data save karein using addDoc and collection
      await addDoc(collection(db, 'contacts'), {
        name,
        email,
        message,
        timestamp: new Date(),
      });

      // Telegram API ke through message bhejein
      const telegramChatId = '-4560624293'; // Apna chat ID yahan daalein
      const telegramToken = '7997041715:AAFsWit8PDHwl9j_6Ninoo6SKe4eAFiTC2Q'; // Apna bot token yahan daalein

      const text = `New message from ${name} (${email}): ${message}`;
      
      await axios.post(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        chat_id: telegramChatId,
        text: text,
      });

      // Form ko clear karein
      setName('');
      setEmail('');
      setMessage('');
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error submitting the form: ', error);
      alert('There was an error. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Message" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        required 
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
