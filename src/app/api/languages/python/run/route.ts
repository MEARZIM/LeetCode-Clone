import { NextRequest, NextResponse } from 'next/server';
import { PythonShell } from 'python-shell';

export const POST = async (req: NextRequest, res: NextResponse) => {
    const data = await req.json();

    const { code } = data;
    // console.log(code);

    try {
        const message = await PythonShell.runString(code)
        const response = NextResponse.json({
            data: message,
            message: "Compilation Finished",
            success: true,
        })

        return response;

    } catch (error: any) {
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

