import { NextRequest, NextResponse } from 'next/server'
import connectDB from "@/database/dbConfig";
import { getUserById, updateUserById } from '@/models/userModel';


connectDB();

export const POST = async (req: NextRequest, res: NextResponse) => {
    const data = await req.json();
    const { disLike, index, user } = data;

    try {

        const updateObject: Record<string, any> = {};
        updateObject[`problemList.${index}.dislike`] = disLike;
        await updateUserById(user._id, updateObject);


        const updatedUser = await getUserById(user._id);

        const dislikedProblems = updatedUser.problemList.filter((problem: any) => problem.dislike === true)

        await updateUserById(user._id, {totalDisLikes: dislikedProblems.length});
        

        const response = NextResponse.json({
            message: "DisLiked Successfully",
            success: true,
        })

        return response

    } catch (error) {
        console.log(error);
        return error;
    }
}


