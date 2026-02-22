'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
export default function Loader(){
    return(
        <div className='flex flex-col items-center justify-center z-10 h-screen w-screen bg-foreground'>
            <div className='h-[10vh] z-20'>
            <DotLottieReact src="preloader.json" loop autoplay />
            </div>
        </div>
    );
}