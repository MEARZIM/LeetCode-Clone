import connectDB from '@/database/dbConfig';
import { getUserById, updateUserById } from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { PythonShell } from 'python-shell';

connectDB();

export const POST = async (req: NextRequest, res: NextResponse) => {
    const data = await req.json();
    const { user, index, code, problem } = data;

   

    try {

        // Maping the command line parameters
        let options = {
            args: problem.testCase.input.map((value: string)=>{
                return value
            })
        };
        
        // Return the output as list(Pyhton)
        const message = await PythonShell.runString(code,options)
       

        // map the outputs 
        const Output = problem.testCase.output.map((value: string)=>{
            return value
        })
        

        // check if all the tests passed or failed
        let checkResultCount = 0;
        for (let index = 0; index < Output.length; index++) {
            if (Output[index] === message[index]) {
                checkResultCount++;
            }else{
                break;
            }
        }
        
        // returning the responce 
        if (checkResultCount === Output.length) {

            const updateObject: Record<string, any> = {};

            // set the solved part true
            updateObject[`problemList.${index}.solved`] = true;
            await updateUserById(user._id, updateObject);

            // set the solved code in db
            updateObject[`problemList.${index}.solvedAnswer`] = code;
            await updateUserById(user._id, updateObject);

            // set the solved
            updateObject[`problemList.${index}.solved`] = true;
            await updateUserById(user._id, updateObject);

            // Set Total number of Solves
            const updatedUser = await getUserById(user._id);

            const solvedproblems = updatedUser.problemList.filter((problem: any) => problem.solved === true);
            await updateUserById(user._id, { totalSolved: solvedproblems.length });



            const response = NextResponse.json({
                data: message,
                message: "All Test Cases passed",
                success: true,
            })



            return response;
        }else{
            const responseTaseCase = NextResponse.json({
                data: checkResultCount,
                message: "All TestCase Not Passed",
                success: false,
            })
            return responseTaseCase
        }

       
        
    } catch (error: any) {
        // Handle error
        const response = NextResponse.json({
            data: null,
            message: 'Error during compilation',
            success: false,
            status: error.status,
            error: error.message,
        });

        return response;
    }
    
}


