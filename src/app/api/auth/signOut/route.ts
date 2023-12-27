import { NextResponse } from "next/server";

export const GET = async (res: NextResponse) =>{
    try {
        
        const response = NextResponse.json({
            message: "LogOut Successfully",
            success: true
        });

        response.cookies.set(process.env.TOKEN_NAME!, "", {
            httpOnly: true,
            expires: new Date(0)
        });

        return response;

    } catch (error) {
        console.log(error);
    }
}