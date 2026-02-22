import React from 'react'
import FeatureSlider from './feature-slider'
function Features() {
  return (
    <div className='bg-foreground max-w-full w-full p-2 md:min-h-screen text-center z-10 md:bg-white'>
      <h1 className='font-borela text-gray-600 text-4xl md:text-6xl mt-16'> HEALTH. <span className='text-black'>SAFETY. </span> HAPPINESS.</h1>
      <h2 className='font-montserrat text-md md:text-3xl mt-4 text-gray-500'>Discover below the major features that our smart collar provides for your pet.</h2>
      <div className='mt-4 md:mt-16'>
        <FeatureSlider/>
      </div>   
    </div>
  )
}

export default Features