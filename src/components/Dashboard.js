import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Import database configuration
import { collection, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import FAB from './FAB';

const Dashboard = () => {
  const { user } = useAuth(); // Get the user from AuthContext
  const [homework, setHomework] = useState([]);
  const [classes, setClasses] = useState([]);
  const [notices, setNotices] = useState([]);
  const [videos, setVideos] = useState([]);
  const [greeting, setGreeting] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [showGreeting, setShowGreeting] = useState(false);
  const [showNotices, setShowNotices] = useState(false);
  const [showClasses, setShowClasses] = useState(false);
  const [showHomework, setShowHomework] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  useEffect(() => {
    // Fetch notices
    const unsubscribeNotices = onSnapshot(collection(db, 'notices'), (snapshot) => {
      setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Fetch classes
    const unsubscribeClasses = onSnapshot(collection(db, 'classes'), (snapshot) => {
      setClasses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Fetch suggested videos
    const unsubscribeVideos = onSnapshot(collection(db, 'videos'), (snapshot) => {
      setVideos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Fetch homework
    const unsubscribeHomework = onSnapshot(collection(db, 'homework'), (snapshot) => {
      setHomework(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeNotices();
      unsubscribeClasses();
      unsubscribeVideos();
      unsubscribeHomework();
    };
  }, []);

  useEffect(() => {
    const hours = new Date().getHours();
    let greetingMessage = '';

    if (hours < 12) {
      greetingMessage = "Good Morning";
    } else if (hours < 18) {
      greetingMessage = "Good Afternoon";
    } else {
      greetingMessage = "Good Evening";
    }

    setGreeting(greetingMessage);
    
    // Show messages
    setTimeout(() => {
      setShowWelcome(false);
      setShowGreeting(true);
    }, 7000); // Show welcome message for 4 seconds

    setTimeout(() => {
      setShowGreeting(false);
      setShowNotices(true);
    }, 14000); // Show greeting for 4 seconds

    setTimeout(() => {
      setShowNotices(false);
      setShowClasses(true);
    }, 21000); // Show notices for 4 seconds

    setTimeout(() => {
      setShowClasses(false);
      setShowHomework(true);
    }, 28000); // Show classes for 4 seconds

    setTimeout(() => {
      setShowHomework(false);
      setShowFinalMessage(true);
    }, 35000); // Show homework for 4 seconds
  }, []);

  return (
    <div>
      <FAB />
      <style>
        {`
          .dashboard-container {
            background: linear-gradient(135deg, #1e1e1e, #2d003e, #7300b5, #f5a623, #00c4ff);
            background-size: 300% 300%;
            animation: movingGradient 10s ease-in-out infinite;
            min-height: 100vh;
            color: white;
            display: flex;
            flex-direction: column;
            padding: 20px;
            position: relative;
          }

          @keyframes movingGradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .top-section {
            flex: 0.2;
            background-color: white;
            padding: 30px;
            color: #333;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
          }

          .typewriter {
            display: inline-block; 
            overflow: hidden; 
            white-space: nowrap; 
            border-right: 0.15em solid orange; 
            width: 0; 
            animation: typing 4s steps(30, end), blink-caret 0.75s step-end infinite;
            font-size: 30px; 
            font-weight: bold; 
            text-align: center;
            margin-bottom: 20px; 
          }

          @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
          }

          @keyframes blink-caret {
            from, to { border-color: transparent; }
            50% { border-color: orange; }
          }

          .bottom-section {
            flex: 0.8;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 30px;
            background-color: #f5f5f5;
            border-radius: 6px;
            padding: 20px;
          }

          .section {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            min-height: 350px;
          }

          .section h3 {
            color: #1E90FF;
            margin-bottom: 20px;
          }

          .section p, .section a {
            font-size: 18px;
            color: #333;
            margin-bottom: 10px;
          }

          .section a:hover {
            text-decoration: underline;
            color: #1E90FF;
          }

          @media (max-width: 768px) {
            .bottom-section {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div className="dashboard-container">
        <div className="top-section">
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            {/* Welcome Message */}
            {showWelcome && (
              <div className="typewriter">
                Welcome to Sulekha Devi Mission School
              </div>
            )}
            {/* Greeting Message */}
            {showGreeting && (
              <div className="typewriter">
                {greeting}
              </div>
            )}
            {/* User Welcome */}
            {user ? (
              <h2 style={{ marginTop: '20px' }}>Welcome, {user.displayName || user.email}</h2>
            ) : (
              <h2 style={{ marginTop: '20px' }}>Please log in</h2>
            )}
            {/* Important Notices */}
            {showNotices && (
              <div className="typewriter">
                {notices.length > 0 ? (
                  notices.map(notice => (
                    <div key={notice.id}>
                      <p>Important Notice: {notice.message}</p>
                    </div>
                  ))
                ) : (
                  <p>No new notice here.</p>
                )}
              </div>
            )}
            {/* Upcoming Classes */}
            {showClasses && (
              <div className="typewriter">
                {classes.length > 0 ? (
                  classes.map(cls => (
                    <div key={cls.id}>
                      <h4>{cls.subject}</h4>
                      <p>{new Date(cls.startTime).toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <p>No class information at this time.</p>
                )}
              </div>
            )}
            {/* Homework */}
            {showHomework && (
              <div className="typewriter">
                {homework.length > 0 ? (
                  homework.map(hw => (
                    <div key={hw.id}>
                      <p
                        style={{
                          color: 'darkpurple',
                          fontWeight: 'bold',
                          fontSize: '28px',
                          border: '2px solid purple',
                          padding: '10px',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                          borderRadius: '10px'
                        }}
                      >
                        {hw.title}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No homework assigned.</p>
                )}
              </div>
            )}
            {/* Final Message */}
            {showFinalMessage && (
              <div className="typewriter">
                Have a nice day!
              </div>
            )}
          </div>
        </div>

        <div className="bottom-section">
          {/* Important Notices */}
          <div className="section">
            <h3>Important Notices</h3>
            {notices.length > 0 ? (
              notices.map(notice => (
                <div key={notice.id}>
                  <p>{notice.message}</p>
                </div>
              ))
            ) : (
              <p>No new notices.</p>
            )}
          </div>

          {/* Upcoming Classes */}
          <div className="section">
            <h3>Upcoming Classes</h3>
            {classes.length > 0 ? (
              classes.map(cls => (
                <div key={cls.id}>
                  <h4>{cls.subject}</h4>
                  <p>{new Date(cls.startTime).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>No upcoming classes.</p>
            )}
          </div>

          {/* Homework */}
          <div className="section">
            <h3>Homework</h3>
            {homework.length > 0 ? (
              homework.map(hw => (
                <div key={hw.id}>
                  <p>{hw.title}</p>
                </div>
              ))
            ) : (
              <p>No homework assigned.</p>
            )}
          </div>

          {/* Suggested Videos */}
          <div className="section">
            <h3>Suggested Videos</h3>
            {videos.length > 0 ? (
              videos.map(video => (
                <div key={video.id}>
                  <p>{video.title}</p>
                </div>
              ))
            ) : (
              <p>No suggested videos available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
