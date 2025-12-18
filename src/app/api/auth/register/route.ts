import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import {User} from "@/models/userModel"

export async function POST(req:Request){
    try {
        const {name,email,password} = await req.json();
        if(!name || !email || !password){
            return NextResponse.json(
                {message:"All fields are required"},
                {status:400}
            );
        }
    
        await connectDB();
    
        const user=await User.findOne({email});
        if(user){
            return NextResponse.json(
                {message:"User already exists"},
                {status:400}
            );
        }
    
        const hashedPassword = await bcrypt.hash(password,10);
    
        await User.create({
            name,
            email,
            password:hashedPassword,
            provider:"credentials"
        })
    
        return NextResponse.json(
            {
                message:"User registered successfully"
            },
            {
                status:201
            }
        )
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                message:"Something went wrong"
            },
            {
                status:500
            }
        )
    }
}