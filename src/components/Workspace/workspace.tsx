'use client'
import { useEffect, useState } from "react";
import Split from "react-split";
import ProblemDescription from "@/components/Workspace/ProblemDescription/problemDescription";
import Playground from "@/components/Workspace/Playground/playground";
import { Problem, Users } from '@/helpers/type';
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";

type props = {
	users: Users,
	problems: [Problem],
}

const workspace = ({ users, problems }: props) => {
	const { width, height } = useWindowSize();
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		// Automatically set success to false after 4 seconds
		if(success){
			const timer = setTimeout(() => {
			  setSuccess(false);
			}, 5000);
		
			// Clear the timer when the component unmounts or when success changes
			return () => clearTimeout(timer);
		}
	  }, [success]);
	
	return (
		<Split className='split' minSize={400}>
			<ProblemDescription user={users} problems={problems} />
			<div className='bg-slate-700'>
				<Playground user={users} problems={problems} setSuccess={setSuccess} />
				{success && <Confetti gravity={0.3} tweenDuration={5000} width={width - 1} height={height - 1} />}
			</div>
		</Split>
	);
}

export default workspace
