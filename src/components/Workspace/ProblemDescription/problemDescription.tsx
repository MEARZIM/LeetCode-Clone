import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike } from "react-icons/ai";
import { FaRegStar, FaStar } from "react-icons/fa";
import { TiInputChecked } from "react-icons/ti";
import { Problem, ProblemList, Users } from '@/helpers/type';
import axios from 'axios';
import { ImCheckboxUnchecked } from 'react-icons/im';


type props = {
    user: Users,
    problems: [Problem],
}

const problemDescription = ({ user, problems }: props) => {

    const params = useParams<any>();
    const [clickedProblems, setClickedProblems] = useState<Problem>();
    const [clickedProblemsId, setClickedProblemId] = useState<string>();
    const [like, setLike] = useState<boolean>(false);
    const [disLike, setDisLike] = useState<boolean>(false);
    const [favorite, setFavorite] = useState<boolean>(false);
    const [difficultyColors, setDifficultyColor] = useState([
        {
            type: 'Hard',
            textColor: 'text-red-200',
            bgColor: 'bg-red-500',
        },
        {
            type: 'Medium',
            textColor: 'text-orange-200',
            bgColor: 'bg-orange-500',
        },
        {
            type: 'Easy',
            textColor: 'text-lime-200',
            bgColor: 'bg-lime-500',
        },
    ]);

   
    // console.log(user)
    useEffect(() => {
        if (problems) {
            problems.forEach((problem: any, index) => {
                if (problem.id === params.id) {
                    setClickedProblems(problem);
                    setClickedProblemId(problem._id);
                }
            })
        }

    }, [problems])

    useEffect(() => {
        const ids = (user?.problemList ?? []).map((prob: any) => prob?._id);
        const foundIndex = ids.indexOf(clickedProblemsId);

        if (foundIndex !== -1) {
            setLike(user.problemList[foundIndex].like);
            setDisLike(user.problemList[foundIndex].dislike)
            setFavorite(user.problemList[foundIndex].favorite);
        }

    }, [user, problems, clickedProblemsId]);




    const handelLikedproblems = async () => {

        const ids = user?.problemList.map((prob: any) => prob?._id);
        const foundIndex = ids.indexOf(clickedProblemsId);

        console.log(foundIndex);

        // Toggle the like state
        setLike((prevLike) => !prevLike);

        try {
            const res = await axios.post('../../../api/handler/handelLikedproblems', {
                like: !like, // Sending the updated like state
                index: foundIndex,
                user: user,
            });

            //   console.log(res.data.message); // Assuming the server responds with some data
        } catch (error) {
            console.error('Error handling liked problems:', error);
        }

    };

    const handelDisLikedproblems = async () => {

        const ids = user?.problemList.map((prob: any) => prob?._id);
        const foundIndex = ids.indexOf(clickedProblemsId);

        console.log(foundIndex);

        // Toggle the like state
        setDisLike((prevDisLike) => !prevDisLike);

        try {
            const res = await axios.post('../../../api/handler/handelDisLikedproblems', {
                disLike: !disLike, // Sending the updated like state
                index: foundIndex,
                user: user,
            });

            //   console.log(res.data.message); // Assuming the server responds with some data
        } catch (error) {
            console.error('Error handling liked problems:', error);
        }

    }

    const handelFavoritesproblems = async () => {
        const ids = user?.problemList.map((prob: any) => prob?._id);
        const foundIndex = ids.indexOf(clickedProblemsId);

        // console.log(foundIndex);

        setFavorite((prevFavorite) => !prevFavorite);

        try {
            const res = await axios.post('../../../api/handler/handelFavoritesproblems', {
                favorite: !favorite,
                index: foundIndex,
                user: user,
            });

            //   console.log(res.data.message); // Assuming the server responds with some data
        } catch (error) {
            console.error('Error handling liked problems:', error);
        }
    }

    return (
        <div className='bg-slate-700'>
            <div className='flex h-11 w-full items-center pt-2 bg-slate-600 text-white overflow-x-hidden overflow-y-auto'>
                <div className={"bg-slate-700 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"}>
                    Description
                </div>

            </div>
            <div className='bg-slate-700'>
                <div className='text-lg text-white p-5'>
                    {clickedProblems?.order}. {clickedProblems?.title}
                </div>
                {/* section 1 */}
                <div className='flex items-center justify-start m-2'>
                    <div className={`mx-4 px-4 py-1 w-15 rounded-full backdrop-blur-smtext-base
                    ${difficultyColors.map((difficultyTypes) => {
                        if (difficultyTypes.type === clickedProblems?.difficulty) {
                            return " " + difficultyTypes.bgColor + " " + difficultyTypes.bgColor + " "
                        }
                    })}
                     `} >
                        {clickedProblems?.difficulty}
                    </div>
                    {/*  Solved Section  */}
                    <div className='mx-2 cursor-pointer' >
                    {user?.problemList.map((userProblem: ProblemList, index: any) => (
                            <div key={index}>
                                {userProblem?._id === clickedProblemsId ? (
                                    userProblem?.solved ? (
                                        <TiInputChecked size={30} color={'green'} />
                                    ) : (
                                        <ImCheckboxUnchecked size={20} color={'green'} />
                                    )
                                ) : (
                                    '' // An empty string is rendered when the IDs don't match
                                )}
                            </div>
                        ))}

                    </div>
                    {/* Liked Section */}
                    <div className='mx-2 flex cursor-pointer' >
                        <div onClick={handelLikedproblems} >
                            {like ? <AiFillLike size={20} color={'blue'} /> : <AiOutlineLike size={20} color={'blue'} />}
                        </div>
                        <span className='ml-2 cursor-pointer'>123</span>
                    </div>
                    {/* Disliked Section */}
                    <div className='mx-2 flex cursor-pointer'>
                        <div onClick={handelDisLikedproblems} >
                            {disLike ? <AiFillDislike size={20} color={'red'} /> : <AiOutlineDislike size={20} color={'red'} />}
                        </div>

                        <span className='ml-2'>123</span>
                    </div>
                    {/* Favorite Section */}
                    <div className='mx-3 cursor-pointer'>
                        <div onClick={handelFavoritesproblems}>
                            {favorite ? <FaStar size={20} color={'yellow'} /> : < FaRegStar size={20} color={'yellow'} />}
                        </div>
                    </div>
                </div>
                {/* section 2 */}
                <div className='px-5 py-2 text-white'>
                    {/* For HTML content Rendering */}
                    <div dangerouslySetInnerHTML={{ __html: clickedProblems?.problemStatement || '' }} />
                </div>
                {/* section 3 */}
                <div className='mt-4 px-5'>
                    {clickedProblems?.examples.map((examples, index) => (
                        <div key={index} >
                            <p className='font-medium text-white '>Example  {examples.id + 1}</p>
                            <div className='example-card'>
                                <pre>
                                    <strong className='text-white'>Input: </strong> {examples.inputText}
                                    <br />
                                    <strong>Output:</strong> {examples.outputText}
                                    <br />

                                    {examples.explanation && (
                                        <>
                                            <strong>Explanation: </strong> {examples.explanation}
                                        </>
                                    )}

                                </pre>
                            </div>
                        </div>

                    ))}

                </div>
                <div className='px-5 py-2 text-white'>
                    {clickedProblems?.constraints && (
                        <>
                            Constraints:<br />
                            <strong>
                                <div className='m-5' dangerouslySetInnerHTML={{ __html: clickedProblems?.constraints || '' }} />
                            </strong>
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}

export default problemDescription
