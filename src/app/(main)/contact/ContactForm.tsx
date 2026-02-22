/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from 'react';


const FIELDS = [
  { label: 'First name', name: 'firstName', type: 'text', required: true },
  { label: 'Last name', name: 'lastName', type: 'text', required: true },
  { label: 'Email', name: 'email', type: 'email', required: true },
  { label: 'Phone number', name: 'phone', type: 'tel', required: false },
  { label: 'Message', name: 'message', type: 'textarea', required: true, rows: 5 },
];

const SuccessPopup = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    // Auto close popup after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-30" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-md w-full mx-4">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-green-100 rounded-full p-2">
            <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-center text-gray-800">Success!</h3>
        <p className="text-gray-600 text-center mt-2">Your message has been sent successfully.</p>
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="bg-primary hover:bg-secondary text-white font-medium py-2 px-6 rounded-xl transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const initialState = FIELDS.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {} as Record<string, string>);

  const [formData, setFormData] = useState(initialState);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setFormData(initialState);
        setShowSuccess(true);
      } else {
        alert(data?.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setShowSuccess(false);
  };

  return (
    <div className="bg-white rounded-3xl md:bg-current mx-auto p-6 w-full font-montserrat text-left">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">Send us a message</h2>
      <p className="text-gray-600 mb-6">Do you have a question? Please feel free to contact us.</p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {FIELDS.slice(0, 4).map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-gray-700 mb-2">{field.label}</label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                required={field.required}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 text-black"
              />
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            rows={FIELDS.find(f => f.name === 'message')?.rows || 5}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 text-black"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-primary hover:bg-secondary text-white font-medium py-2 px-8 rounded-xl transition duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
        </button>
      </form>

      {showSuccess && <SuccessPopup onClose={closePopup} />}
    </div>
  );
};

export default ContactForm;