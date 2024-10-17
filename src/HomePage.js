import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WelcomeLoading from './components/loading/WelcomeLoading';
import LoadingLogin from './components/loading/LoadingLogin';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Modal from './components/Modal'; // Import the Modal component
import EventCalendar from './components/EventCalander';
import Slideshow from './components/SlideShow';
import 'animate.css'; // Import Animate.css
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import Testimonials from './components/Testimonials'

const HomePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedTeacher, setSelectedTeacher] = useState(null); // Selected teacher for contact
  const [feedbackMessage, setFeedbackMessage] = useState(''); // Feedback message state
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setFeedbackMessage('Please fill in all fields.');
      return;
    }
    setFeedbackMessage('Message sent successfully!');
    // Reset fields
    setName('');
    setEmail('');
    setMessage('');
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachersCollection = collection(db, 'teachers');
        const teachersSnapshot = await getDocs(teachersCollection);
        const teachersList = teachersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeachers(teachersList);
        setLoadingTeachers(false);
      } catch (err) {
        console.error('Error fetching teachers:', err.message);
        setError('Failed to load teacher data');
        setLoadingTeachers(false);
      }
    };

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    fetchTeachers();

    return () => clearTimeout(loadingTimeout); // Cleanup timeout
  }, []);

  const handleLoginClick = () => {
    setLoadingLogin(true);
    setTimeout(() => {
      setLoadingLogin(false);
      navigate('/login');
    }, 3000);
  };

  const handleContactClick = useCallback((teacher) => {
    setSelectedTeacher(teacher); // Set the selected teacher
    setIsModalOpen(true); // Open the modal
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedTeacher(null); // Reset the selected teacher
  };

  if (loadingLogin) {
    return <LoadingLogin />;
  }

  if (loading) {
    return <WelcomeLoading />;
  }

  if (loadingTeachers) {
    return <div className="text-center text-gray-700">Loading teachers...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="sticky top-0 bg-blue-500 p-4 shadow-md z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">Sulekha Devi Mission School</div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-yellow-300">Home</Link>
            </li>
            <li>
              <Link to="/about-us" className="text-white hover:text-yellow-300">About Us</Link>
            </li>
            <li>
              <Link to="/courses" className="text-white hover:text-yellow-300">Courses</Link>
            </li>
            <li>
              <button onClick={handleLoginClick} className="text-white hover:text-yellow-300">Login</button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-cover bg-center animate__animated animate__fadeIn" style={{ backgroundImage: `url('your-image.jpg')` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 bg-opacity-75"></div>
        <div className="relative z-10 text-white text-center py-20">
          <h1 className="text-5xl md:text-6xl font-bold animate__animated animate__bounce">Welcome to Sulekha Devi Mission School</h1>
          <p className="mt-4 text-lg md:text-xl animate__animated animate__fadeInUp">Nurturing young minds for a brighter future</p>
          <button onClick={handleLoginClick} className="mt-8 bg-yellow-500 hover:bg-yellow-400 text-white font-bold px-6 py-3 rounded-lg transition duration-300">
            Join Us Today
          </button>
          <Link to="/about-us">
            <button className="mt-8 ml-4 bg-white text-blue-500 font-bold px-6 py-3 rounded-lg shadow hover:bg-yellow-200 transition duration-300">
              Learn More
            </button>
          </Link>
        </div>
      </header>

      <Slideshow />

      {/* About Us Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-semibold mb-6 text-center">About Us</h2>
          <p className="text-lg leading-relaxed text-gray-700 text-center max-w-2xl mx-auto">
            At Sulekha Devi Mission School, we believe in fostering a holistic learning environment where students
            excel academically and grow personally. Our experienced faculty is dedicated to providing 
            quality education, ensuring each child reaches their full potential. We offer a diverse 
            curriculum that promotes critical thinking, creativity, and collaboration.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 px-4 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-semibold mb-6 text-center">Why Choose Sulekha Devi Mission School?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow p-6 rounded-lg text-center transition-transform transform hover:scale-105">
              <span className="text-blue-500 text-4xl"><i className="fas fa-chalkboard-teacher"></i></span>
              <h3 className="text-xl font-semibold mt-4">Experienced Teachers</h3>
              <p className="mt-2 text-gray-600">Our educators are dedicated to nurturing students' talents.</p>
            </div>
            <div className="bg-white shadow p-6 rounded-lg text-center transition-transform transform hover:scale-105">
              <span className="text-blue-500 text-4xl"><i className="fas fa-book"></i></span>
              <h3 className="text-xl font-semibold mt-4">Comprehensive Curriculum</h3>
              <p className="mt-2 text-gray-600">A well-rounded curriculum that covers all aspects of learning.</p>
            </div>
            <div className="bg-white shadow p-6 rounded-lg text-center transition-transform transform hover:scale-105">
              <span className="text-blue-500 text-4xl"><i className="fas fa-users"></i></span>
              <h3 className="text-xl font-semibold mt-4">Community Focused</h3>
              <p className="mt-2 text-gray-600">We emphasize the importance of community and collaboration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-semibold mb-6 text-center">Meet Our Teachers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="bg-gray-100 shadow p-6 rounded-lg text-center transition-transform duration-300 transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-2">{teacher.name}</h3>
                <p className="text-gray-600">{teacher.subject}</p>
                <button
                  onClick={() => handleContactClick(teacher)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition duration-300"
                >
                  Contact
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <h2 className="text-xl font-bold mb-4">Contact {selectedTeacher.name}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border rounded py-2 px-3"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition duration-300"
            >
              Send Message
            </button>
            {feedbackMessage && (
              <div className="mt-4 text-green-500">{feedbackMessage}</div>
            )}
          </form>
        </Modal>
      )}

      {/* Event Calendar */}
      <EventCalendar />
      <Testimonials />


{/* Footer */}
<footer className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-8">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
      
      {/* About Section */}
      <div>
        <h4 className="font-semibold text-lg mb-4">About Us</h4>
        <p className="text-sm">
          Sulekha Devi Mission School is committed to providing high-quality education to empower young minds. Our mission is to nurture students for a bright future.
        </p>
      </div>
      
      {/* Quick Links */}
      <div>
        <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/about" className="hover:underline">About Us</a></li>
          <li><a href="/admissions" className="hover:underline">Admissions</a></li>
          <li><a href="/contact" className="hover:underline">Contact Us</a></li>
        </ul>
      </div>
      
      {/* Contact Info */}
      <div>
        <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
        <p className="text-sm">
          Address: Tesobathan, Sundarpahai, Godda, 814156, JH (India)
        </p>
        <p className="text-sm">
          Email: <a href="mailto:info@sulekha-mission.edu.in" className="hover:underline">sdmschoolteso@gmail.com</a>
        </p>
        <p className="text-sm">
          Phone: <a href="tel:+911234567890" className="hover:underline">+91 62023 26183</a>
        </p>
      </div>
    </div>

    {/* Social Media Icons */}
    <div className="mt-8 flex justify-center space-x-6">
      <a href="https://www.facebook.com" className="text-white hover:text-gray-300">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="https://www.twitter.com" className="text-white hover:text-gray-300">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="https://www.instagram.com" className="text-white hover:text-gray-300">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="https://www.linkedin.com" className="text-white hover:text-gray-300">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>

    {/* Footer Bottom */}
    <div className="mt-8 border-t border-gray-300 pt-4 text-center">
      <p className="text-sm">&copy; 2024 Sulekha Devi Mission School. All rights reserved.</p>
    </div>
  </div>
</footer>

{/* Modal */}
{isModalOpen && (
        <Modal teacher={selectedTeacher} onClose={handleModalClose} />
      )}
    </div>
  );
};
export default HomePage;
