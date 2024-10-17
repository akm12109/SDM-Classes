import React, { useEffect, useState } from 'react';

const Loading = () => {
  const [text, setText] = useState('');
  const message = "Welcome, Sulekha Devi Mission School."; //change to institute name

  useEffect(() => {
    let index = 0;
    const typeWriter = () => {
      if (index < message.length) {
        setText((prev) => prev + message.charAt(index));
        index++;
        setTimeout(typeWriter, 50); // Adjust typing speed here (50ms per character)
      }
    };

    typeWriter();

    // Clean up to avoid any possible memory leaks or rerender issues
    return () => {
      index = message.length; // Stop typing effect on unmount
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          <span>{text}</span>
        </h2>
        <div style={styles.loader}></div>
      </div>

      {/* Internal Styles */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f3f4f6', // Tailwind's bg-gray-100 equivalent
  },
  card: {
    backgroundColor: '#ffffff', // Tailwind's bg-white
    padding: '2rem',
    borderRadius: '0.75rem', // Tailwind's rounded-lg
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Tailwind's shadow-md
    textAlign: 'center',
    maxWidth: '24rem', // Tailwind's max-w-md
    width: '100%',
  },
  title: {
    fontSize: '1.875rem', // Tailwind's text-3xl
    fontWeight: 'bold',
    color: '#3b82f6', // Tailwind's text-blue-500
    marginBottom: '1rem', // Tailwind's mb-4
  },
  loader: {
    marginTop: '1.5rem', // Tailwind's mt-6
    marginLeft: 'auto',
    marginRight: 'auto',
    border: '4px solid rgba(59, 130, 246, 0.3)', // Blue with opacity
    borderRadius: '50%',
    borderTop: '4px solid #3b82f6', // Solid blue
    width: '40px',
    height: '40px',
    animation: 'spin 2s linear infinite', // Spin animation
  },
};

export default Loading;
