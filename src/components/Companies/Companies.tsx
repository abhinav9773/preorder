"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import iimb from '@/../public/companies/iimb.png'
import meity from '@/../public/companies/meity.png'
import meitystartup from '@/../public/companies/meitystartup.png'
import vit from '@/../public/companies/vit.png'
import wadhwani from '@/../public/companies/wadhwani.png'

function Companies() {
  return (
    <motion.div 
      className='bg-foreground w-full text-center flex flex-col items-center p-4 md:p-6 lg:p-8'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1 
        className='font-borela text-4xl sm:text-5xl md:text-7xl text-background mt-12 md:mt-20'
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        BACKED BY
      </motion.h1>
      <motion.h2 
        className='font-montserrat text-xl sm:text-2xl text-[#606060] mt-6 md:mt-8 tracking-wide'
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Institutions who have put their trust in us
      </motion.h2>

      <div className='w-full max-w-7xl mt-10 px-4 py-6'>
        <motion.div 
          className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, staggerChildren: 0.1 }}
        >
          {[iimb, meitystartup, meity, wadhwani, vit].map((logo, index) => (
            <motion.div 
              key={index}
              className={`flex items-center justify-center p-2 ${index === 4 ? 'col-span-2 sm:col-span-1' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Image 
                src={logo} 
                alt={`logo-${index}`} 
                className='w-full h-auto max-h-20 object-contain' 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Companies