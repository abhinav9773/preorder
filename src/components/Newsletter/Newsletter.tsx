"use client"
import React, { useState,useEffect } from 'react';
import Image from 'next/image';
import newsletterdog from '@/../public/newsletter/newsletterdog.png'
import { MoveUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';


const SuccessPopup = ({ onClose }:{ onClose: () => void }) => {
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

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setEmail('');
        setShowSuccess(true);
      } else {
        console.error(data?.error || 'Something went wrong. Please try again.');
        setEmail('');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };
  const closePopup = () => {
    setShowSuccess(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      ref={ref}
      className="w-full bg-foreground min-h-[400px] flex items-center justify-center p-6 md:p-12"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">

        <motion.div variants={itemVariants} className="w-full md:w-2/5 md:hidden">
          <div className="overflow-hidden">
            <Image
              src={newsletterdog}
              alt="Person with dog"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <div className="w-full md:w-1/2 space-y-12">
          <motion.h2 variants={itemVariants} className="text-4xl md:text-left text-center text-background font-borela md:text-6xl tracking-wider">
            SUBSCRIBE TO NEWSLETTER
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-600 text-lg md:text-left text-center font-montserrat">
            Stay informed with the latest updates<span className='hidden md:inline'> on pet, and keep up with everything that matters to you and your pets.</span>
          </motion.p>
          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-3 py-4 md:px-5 md:py-5 rounded-full md:pr-32 border border-gray-300 focus:outline-none focus:border-gray-500"
                required
              />
              <button
                type="submit"
                disabled = {isSubmitting}
                className="absolute md:right-3 md:top-3 font-montserrat font-semibold text-sm right-2 top-2 px-2 py-2 md:px-6 md:py-2 bg-background text-white rounded-full hover:bg-gray-700 transition-colors flex md:gap-x-5 items-center gap-2"
              >
                <p className='hidden md:block'>
                {isSubmitting ? 'Subscribing...' : 'SUBSCRIBE'}
                </p>
                <MoveUpRight className='w-6 text-background h-6 bg-primary rounded-full p-1' />
              </button>
            </div>
          </motion.form>
          {showSuccess && <SuccessPopup onClose={closePopup} />}
        </div>

        <motion.div variants={itemVariants} className="w-full md:w-2/5 md:block hidden">
          <div className="overflow-hidden">
            <Image
              src={newsletterdog}
              alt="Person with dog"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Newsletter;