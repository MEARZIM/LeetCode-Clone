import { NextRequest, NextResponse } from 'next/server'
import connectDB from "@/database/dbConfig";
import { getUserById, updateUserById } from '@/models/userModel';


connectDB();

export const POST = async (req: NextRequest, res: NextResponse) => {
    const data = await req.json();
    const { like, index, user } = data;

    try {
        const updateObject: Record<string, any> = {};
        updateObject[`problemList.${index}.like`] = like;
        await updateUserById(user._id, updateObject);


        const updatedUser = await getUserById(user._id)

        const likedProblems = updatedUser.problemList.filter((problem: any) => problem.like === true);


        // Update 'totalLikes' in a single call
        await updateUserById(user._id, { totalLikes: likedProblems.length });

        const response = NextResponse.json({
            message: "Liked Successfully",
            success: true,
        })

        return response

    } catch (error) {
        console.log(error);
        return error;
    }
}


