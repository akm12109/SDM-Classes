// EventCalendar.js
import React, { useEffect, useState } from 'react';
import { db } from './../firebaseConfig'; // Import your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'events');
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsList = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err.message);
        setError('Failed to load events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-700">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-semibold mb-6 text-center">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-gray-100 p-4 rounded-lg text-center">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-500">{event.date}</p>
              {event.imageURL && <img src={event.imageURL} alt={event.title} className="mt-2 rounded-lg w-full h-auto" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventCalendar;
