import React, { useEffect, useState } from 'react'
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from 'react-icons/ai';

const playgroundNavbar = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleFullScreen = () => {
        if (isFullScreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
        setIsFullScreen(!isFullScreen);
    };

    useEffect(() => {
        function exitHandler(e: any) {
            if (!document.fullscreenElement) {
                setIsFullScreen(false);
                return;
            }
            setIsFullScreen(true);
        }

        if (document.addEventListener) {
            document.addEventListener("fullscreenchange", exitHandler);
            document.addEventListener("webkitfullscreenchange", exitHandler);
            document.addEventListener("mozfullscreenchange", exitHandler);
            document.addEventListener("MSFullscreenChange", exitHandler);
        }
    }, [isFullScreen]);

    return (
        <div className='flex items-center justify-between bg-slate-700 h-11 w-full '>
            <div className='flex items-center text-white'>
                <button className='flex cursor-pointer items-center ml-2 rounded focus:outline-none bg-slate-600 text-dark-label-2 hover:bg-slate-400  px-2 py-1.5 font-medium'>
                    <div className='flex items-center px-1'>
                        <div className='text-xs text-label-2 dark:text-dark-label-2'>Python</div>
                    </div>
                </button>
            </div>

            <div className='flex items-center m-2'>
                <button
                    className='relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex  ml-auto p-1 mr-2 hover:bg-dark-fill-3'
                // onClick={() => setSettings({ ...settings, settingsModalIsOpen: true })}
                >
                    <div className='h-4 w-4 font-bold text-lg'>
                        <AiOutlineSetting />
                    </div>
                    
                </button>

                <button className='relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex  ml-auto p-1 mr-2 hover:bg-dark-fill-3' onClick={handleFullScreen}>
                    <div className='h-4 w-4 font-bold text-lg'>
                        {!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
                    </div>
                    
                </button>
            </div>
            {/* {settings.settingsModalIsOpen && <SettingsModal settings={settings} setSettings={setSettings} />} */}
        </div>
    );
}

export default playgroundNavbar
