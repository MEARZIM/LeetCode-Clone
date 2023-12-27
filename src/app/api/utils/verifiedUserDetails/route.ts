import connectDB from "@/database/dbConfig";
import {getUserBySessionToken} from '@/models/userModel';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

connectDB();

export const GET = async (request: NextRequest) => {
    try {

        const token = request.cookies.get(process.env.TOKEN_NAME!)?.value || '';

        const user = await getUserBySessionToken(token);

        if (user) {
            return NextResponse.json({user});
        }
        
    } catch (error) {
        console.error(error);
    }
    
}


