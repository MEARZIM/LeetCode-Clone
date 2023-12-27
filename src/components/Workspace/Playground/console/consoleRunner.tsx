import React, { useState } from 'react'
import { BsChevronUp } from 'react-icons/bs'

type Props = {
	handleRun: () => void;
	handleSubmit: () => void;
	output: string | null;
};

const UserConsole = ({handleRun,handleSubmit, output}: Props) => {
	

	return (
		<>
			<div className='flex h-fit min-h-[10vh] max-h-[35vh] bg-slate-700 bottom-0 w-full overflow-hidden'>
				<div className='mx-5 my-[10px] flex justify-between w-full'>
					<div className='mr-2 flex flex-1 flex-nowrap items-center space-x-4'>
						<button className='px-3 py-1.5 font-medium items-center transition-all inline-flex bg-slate-500 text-sm hover:bg-slate-400 text-black rounded-lg pl-3 pr-2'>
							Console
							<div className='ml-1 transform transition flex items-center'>
								<BsChevronUp className=' mx-1' color={'grey'} />
							</div>
						</button>
					</div>
					<div className='ml-auto flex items-center space-x-4'>
						<button
							className='px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-slate-500  hover:bg-slate-200 text-black rounded-lg'
							onClick={handleRun}
						>
							Run
						</button>
						<button
							className='px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-dark-green-s hover:bg-green-300 rounded-lg'
							onClick={handleSubmit}
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default UserConsole
