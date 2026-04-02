import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const token = process.env.ADMIN_TOKEN;

export async function GET () {
    const cks = await cookies();
    const storedToken = cks.get('token')?.value;
    
    if (!token) {
        return new NextResponse('Some environment variables aren\'t set', { status: 500 });
    }
    
    if (storedToken === token) {
        return new NextResponse(null, { status: 204 });
    }
    
    return new NextResponse(null, { status: 401 });
}

export async function POST (req: NextRequest) {
    const password = process.env.ADMIN_PASSWORD;
    
    if (!token || !password) {
        return new NextResponse('Some environment variables aren\'t set', { status: 500 });
    }
    
    const cks = await cookies();
    
    const { password: inputPassword } = await req.json();
    
    if (inputPassword === password) {
        cks.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 30 // 30 days
        });
        return new NextResponse(null, { status: 200 });
    }
    
    return new NextResponse(null, { status: 401 });
}