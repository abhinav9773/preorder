import React from 'react';
import MissionCard from './MissionCard';

function Mission() {
  return (
    <div className='bg-foreground w-full min-h-screen text-center flex flex-col items-center  md:p-6 lg:p-8 md:mt-12'>
      <h1 className="font-borela text-4xl sm:text-5xl md:text-7xl text-center text-background mt-12 md:mt-0">
        <p className='md:block hidden'>ENHANCING LIVES.<br />ONE PAW AT A TIME.</p>
      </h1>
      <div className='flex flex-col md:flex-row justify-center gap-8'>
        <MissionCard 
            iconSrc="/mission/mission.png"
            imageSrc="/mission/dog-playing-1.jpeg"
            title="OUR MISSION"
            description="To revolutionise pet care through technology, delivering personalised protection and health insights, because dogs give us unconditional love, and they deserve safety, care, and a longer, happier life."
        />
        <MissionCard 
            iconSrc="/mission/vision.png"
            imageSrc="/mission/dog-playing-2.jpeg"
            title="OUR VISION"
            description="To redefine pet care by making every dog continuously visible, protected, and cared for setting a new standard where uncertainty is replaced with awareness."
        />
      </div>
    </div>
  );
}

export default Mission;