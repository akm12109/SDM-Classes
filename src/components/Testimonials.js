import React, { useState, useEffect } from 'react';
import { db } from './../firebaseConfig'; // Import your Firebase config
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [formData, setFormData] = useState({ name: '', feedback: '' });

    useEffect(() => {
        // Fetch testimonials from Firestore
        const unsubscribe = onSnapshot(collection(db, 'testimonials'), (snapshot) => {
            const testimonialsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTestimonials(testimonialsData);
        });

        return () => unsubscribe();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.name && formData.feedback) {
            try {
                await addDoc(collection(db, 'testimonials'), {
                    name: formData.name,
                    feedback: formData.feedback,
                });
                setFormData({ name: '', feedback: '' }); // Reset form
            } catch (error) {
                console.error("Error adding testimonial: ", error);
            }
        }
    };

    return (
        <section className="py-12 px-4 bg-white">
            <div className="container mx-auto">
                <h2 className="text-4xl font-semibold mb-6 text-center">What Our Students Say</h2>
                <div className="flex flex-wrap justify-center">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="max-w-xs bg-gray-100 shadow p-6 rounded-lg mx-4 my-4">
                            <p className="italic">"{testimonial.feedback}"</p>
                            <h4 className="mt-4 font-bold">- {testimonial.name}</h4>
                        </div>
                    ))}
                </div>

                <h3 className="text-2xl font-semibold mb-4 text-center">Add Your Review</h3>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="mb-4 p-2 border rounded"
                        required
                    />
                    <textarea
                        name="feedback"
                        value={formData.feedback}
                        onChange={handleChange}
                        placeholder="Your Feedback"
                        className="mb-4 p-2 border rounded"
                        rows="4"
                        required
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Testimonials;
