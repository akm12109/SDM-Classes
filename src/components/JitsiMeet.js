// src/components/JitsiMeet.js
import React, { useEffect } from 'react';

const JitsiMeet = () => {

  useEffect(() => {
    // Jitsi Meet External API ko dynamically load karte hain
    const domain = "meet.jit.si";
    const options = {
      roomName: "VideoXClass", // Room name, use a unique one
      width: "100%",
      height: 600,
      parentNode: document.getElementById('jitsi-container'), // Yeh div me load hoga
      interfaceConfigOverwrite: {
        TILE_VIEW_MAX_COLUMNS: 2,
      },
      configOverwrite: {
        disableDeepLinking: true, // Prevents app installation
      },
    };
    
    // JitsiMeetExternalAPI ko load karna
    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => api.dispose(); // Clean up after component unmounts
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-4xl h-[80vh] rounded-lg overflow-hidden shadow-lg bg-white p-4">
        <div id="jitsi-container" style={{ width: '100%', height: '100%' }}></div>
      </div>
    </div>
  );
};

export default JitsiMeet;
