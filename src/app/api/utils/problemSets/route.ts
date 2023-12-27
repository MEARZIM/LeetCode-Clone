import connectDB from '@/database/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import {getProblems} from '@/models/problemModel'

connectDB();

export const GET = async (req: NextRequest, res:NextResponse) =>{
    try {
        const data =  await getProblems();
        return NextResponse.json({data});
        
    } catch (error) {
        console.log(error)
    }

}