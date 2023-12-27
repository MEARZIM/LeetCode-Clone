import React, { useEffect, useState } from 'react'
import { MdAlarm } from 'react-icons/md';
import { RiTimerFlashLine } from "react-icons/ri";

const timer = () => {
    const [showTimer, setShowTimer] = useState<boolean>(false);
    const [time, setTime] = useState<number>(0);

    // Format timer into : hh:mm:ss format
	const formatTime = (time: number): string => {
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time % 3600) / 60);
		const seconds = time % 60;

		return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${
			seconds < 10 ? "0" + seconds : seconds }`;
	};

    useEffect(() => {
		let intervalId: NodeJS.Timeout;

        // increment the interval every second
		if (showTimer) {
			intervalId = setInterval(() => {
				setTime((time) => time + 1);
			}, 1000);
		}

		return () => clearInterval(intervalId);
	}, [showTimer]);

    return (
        <div >
            {showTimer ? 
                (<div className='h-8 flex items-center justify-center rounded mr-5 cursor-pointer  hover:bg-gray-400'>
                    {/* <RiTimerFlashLine size={24} color={"white"}/> */}
                    <div>{formatTime(time)}</div>
					<RiTimerFlashLine size={24} color={"white"}
						onClick={() => {
							setShowTimer(false);
							setTime(0);
						}}
					/>
                </div>
            ) : (
                <div className='h-8 w-8 flex items-center justify-center rounded mr-5 cursor-pointer  hover:bg-gray-400'>
                    <MdAlarm size={24} color={"white"}
                        onClick={() => setShowTimer(true)}
                    />
                </div>
            )}
        </div>
    )
}

export default timer;
