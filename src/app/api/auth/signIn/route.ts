import connectDB from "@/database/dbConfig";
import { random,authentication } from "@/helpers/encryption";
import { createUser, getUserByEmail } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connectDB();

export const POST = async(req: NextRequest, res: NextResponse) => {
    try {
        
        const data  = await req.json();
        const { email, password } = data;
    
        if (!email || !password) {
            return NextResponse.json({ error: "Invalid email or password" },{status: 409});
        }
        
        const verifiedUser = await getUserByEmail(email).select('+authentication.salt + authentication.password');
        // console.log(verifiedUser._id.toString());
    
        if (!verifiedUser) {
            return NextResponse.json({ error: "User Not Found" },{status: 400});
        }
        
        if (verifiedUser.authentication && verifiedUser.authentication.salt) {

            const expectedHash = authentication(verifiedUser.authentication.salt, password);
          
            if (expectedHash !== verifiedUser.authentication.password) {

                // If passwords do not match, return an error response with a 408 status code
                return NextResponse.json({ error: "Password Not matched" }, { status: 408 });

            } else {

                // Passwords match
                // console.log("Passwords match");

                //creating a token and saving it
                const salt = random();
                verifiedUser.authentication.sessionToken = authentication(salt, verifiedUser._id.toString());
                await verifiedUser.save();

                const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
                const response = NextResponse.json({
                    data: verifiedUser._id,
                    message: "login successful",
                    success: true,
                    expires: Date.now() + oneDayInMilliseconds
                })

                response.cookies.set(process.env.TOKEN_NAME!, verifiedUser.authentication.sessionToken,{
                    httpOnly: true,
                    path:"/",
                });

                return response;

            //   return NextResponse.json(verifiedUser,{status: 200});

            }
          } else {

            // Handle the case where 'verifiedUser.authentication' is undefined
            return NextResponse.json({ error: "User Not Found" }, { status: 404 });

          }
        
    } catch (error) {
        console.log(error);
    }

}