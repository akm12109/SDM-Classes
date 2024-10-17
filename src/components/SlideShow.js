// Slideshow.js
import React, { useEffect, useState } from 'react';
import { db } from './../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Slideshow = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      const slidesCollection = collection(db, 'slides');
      const slidesSnapshot = await getDocs(slidesCollection);
      const slidesList = slidesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSlides(slidesList);
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(intervalId);
  }, [slides]);

  if (!slides.length) {
    return <p>Loading slides...</p>;
  }

  return (
    <section className="py-12 px-4 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-4xl font-semibold mb-6 text-center">Slideshow</h2>
        <div className="relative">
          <img
            src={slides[currentSlideIndex].imageURL}
            alt={slides[currentSlideIndex].title}
            className="w-full h-auto rounded-lg shadow-md"
          />
          <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-4">
            <h3 className="text-xl font-bold">{slides[currentSlideIndex].title}</h3>
            <p>{slides[currentSlideIndex].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slideshow;
