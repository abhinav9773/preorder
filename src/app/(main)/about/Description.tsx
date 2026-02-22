import React from 'react'

function Description() {
  return (
    <div className='w-full flex flex-col md:flex-row gap-8'>
        <h1 className='text-3xl md:text-5xl font-borela text-background md:w-1/2'>
        Smart Care for Pets, Every Step of the Way
        </h1>
        <div className='md:w-1/2 font-montserrat font-medium text-md md:text-lg text-background'>
            <p>MyPerro is dedicated to enhancing the bond between pets and their parents through innovation and care.</p>
            <br></br><p>MyPerro is more than a service, it&apos;s a commitment to redefining pet care with technology and trust.</p>
            <br></br><p>At MyPerro, we&apos;re driven by a simple mission: to ensure every pet is safe, healthy, and happy. With our state-of-the-art smart collars and personalized pet care services like dog walking and boarding, we provide solutions that make life easier for both pets and their owners. </p>
        </div>
    </div>
  )
}

export default Description