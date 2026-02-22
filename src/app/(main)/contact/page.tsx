import React from 'react'
import Newsletter from '@/components/Newsletter/Newsletter'
import Companies from '@/components/Companies/Companies'
import { MoveUpRight } from 'lucide-react'
import ContactCard from './ContactCard'
import ContactForm from './ContactForm'
import Link from 'next/link'
export const metadata = {
  title: 'Contact',
  description: 'Get in touch with MyPerro for inquiries, collaborations, or support. We’re here to help!',
};


function page() {
  return (
    <div className='w-[85vw]'>
    <div className="text-black w-full md:h-screen mt-4">
      <div className="relative w-full h-[30vh] md:h-[85vh] overflow-hidden rounded-3xl md:px-10 md:py-16">
        {/* Background image with overlay */}
        <div className="absolute inset-0 bg-[url('/contact/contact-hero.jpeg')] bg-cover bg-top" />
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        {/* Content */}
        <div className="relative z-10 p-6 md:p-10 flex justify-center md:gap-8  h-full flex-col">
          <h1 className="text-4xl md:text-6xl lg:text-8xl text-left text-white font-borela">
            CONTACT <br className="md:hidden block" />
            US
          </h1>

          <div className="hidden md:flex mt-5 justify-between">
            <div className="w-3/4 lg:w-1/2 text-left">
              <p className="text-white text-2xl">
                Need assistance? We're always here for you and your furry
                friends!{" "}
              </p>
            </div>
          </div>
          <div className="relative mt-4">
            <Link href="/contact#contact-form" passHref>
            <button
              className="font-montserrat font-semibold text-md md:text-xl w-fit px-4 py-2 bg-primary text-white rounded-full hover:bg-gray-700 transition-colors flex flex-row justify-between pl-4 gap-x-5 pr-2 items-center gap-2"
            >
              CONTACT FORM
              <MoveUpRight className="w-6 md:w-9 text-background h-6 md:h-9 bg-[#A05514] text-white rounded-full p-1" />
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    
    <div id="contact-form" className="bg-foreground w-full min-h-screen text-center flex flex-col items-center p-4 md:p-6 lg:p-8">

          <h1 className="font-borela text-4xl sm:text-5xl md:text-7xl text-center text-background  mt-12 md:mt-0">
            <p className=''>GET IN TOUCH WITH US </p>
            <p className='mt-4 text-2xl font-montserrat text-gray-600'>Because we believe that great care starts with a conversation!</p>
          </h1>

          <div className='w-full md:px-8 mt-12 gap-8 flex flex-col md:flex-row'>
            <ContactCard />
            <div className='w-full md:w-2/3'>
                <ContactForm />
            </div>
          </div>
    </div>
    
    <Newsletter />
    <Companies />
    </div>
  )
}

export default page