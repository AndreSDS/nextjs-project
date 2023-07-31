import { db as prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { email, minLength, object, type Output, parse, string } from 'valibot';
import bcrypt from 'bcrypt'

const Schema = object({
    name: string(),
    email: string([email()]),
    password: string([minLength(6)]),
});

export async function POST(request: NextRequest) {
    const user = await request.json()

    try {
        parse(Schema, user);
    } catch (error) {
        return NextResponse.json("Dados inválidos", { status: 400 })
    }

    const isUserExists = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    })

    if (isUserExists) {
        return NextResponse.json({
            error: "E-mail já cadastrado",
            status: 400
        })
    }

    const hasshedPassword = await bcrypt.hash(user.password, 10)
    const userCreated = await prisma.user.create({
        data: {
            email: user.email,
            name: user.name,
            hashedPasswird: hasshedPassword
        }
    })

    return NextResponse.json(userCreated)
}