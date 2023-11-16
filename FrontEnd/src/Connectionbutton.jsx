import React, { useState } from 'react';

const Connectionbutton = () => {
  const [message, setMessage] = useState('');

  const handleCheckConnection = async () => {
    try {
      const response = await fetch('/api/checkConnection');
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error checking connection:', error);
    }
  };

  return (
    <div>
      <button onClick={handleCheckConnection}>Check Connection</button>
      <p>{message}</p>
    </div>
  );
};

export default Connectionbutton;