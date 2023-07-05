import { default as bcrypt } from 'bcryptjs';
import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import jwt from 'jsonwebtoken'
import { TRPCError } from "@trpc/server";
import { User } from "~/types";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

const createToken = (id: string) => {
    const token: string = jwt.sign({ id }, JWT_SECRET_KEY);
    return token;
}

export const userRouter = createTRPCRouter({
    signup: publicProcedure.input(z.object({
        DOB: z.string(),
        email: z.string(),
        username: z.string(),
        password: z.string()
    })).mutation(async req => {
        const { username, DOB, email, password } = req.input;
        
        if (!username || !DOB || !email || !password)
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: "Must be fill all fields"
            });

        const existsEmail: User | null = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existsEmail)
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'There is account with this email',
            });

        const existsUsername: User | null = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (existsUsername)
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'There is account with this username',
            });

        const salt: string = await bcrypt.genSalt(10); 
        const hash: string = await bcrypt.hash(password, salt);

        const user: User = await prisma.user.create({
            data: {
                DOB: new Date(DOB), id: username, username, email, password: hash, avatar: '/images/Profile avatar.jpg'
            }
        })

        const token: string = createToken(user.id);
        
        return { token, avater: user.avatar };
    }),

    login: publicProcedure.input(z.object({ 
        email: z.string(),
        password: z.string()
    })).mutation(async (req) => {
        const { email, password } = req.input;

        if (!email || !password)
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: "Must be fill all fields"
            });

        const user: User | null = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user)
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: "Incorrect email"
            });

        const match: boolean = await bcrypt.compare(password, user.password); 

        if (!match)
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: "Incorrect password"
            });

        const token: string = createToken(user.id);
        
        return { token, avater: user.avatar };
    }),

    update: privateProcedure.input(z.object({
        email: z.string(),
        username: z.string(),
        password: z.string(),
        avatar: z.string()
    })).mutation(async req => {
        const id = req.ctx.req.user;
        const { email, username, password, avatar } = req.input;

        const currentUser: User | null = await prisma.user.findUnique({
            where: {
                id
            }
        }) 

        const existsEmail: User | null = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existsEmail?.email !== currentUser?.email)
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'There is account with this email',
            });

        const existsUsername: User | null = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (existsUsername?.username !== currentUser?.username)
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'There is account with this username',
            });

        if (password) {
            const salt: string = await bcrypt.genSalt(10);
            const hash: string = await bcrypt.hash(password, salt);
            await prisma.user.update({ 
                where: {
                    id
                },
                data: {
                    password: hash
                }
            })
        }

        const user: User | null = await prisma.user.update({
            where: {
                id
            },
            data: {
                username,
                email,
                DOB: currentUser?.DOB,
                avatar
            }
        });

        return user;
    }),

    user: privateProcedure.query(async req => {
        const id  = req.ctx.req.user;

        const user: User | null = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                studySets: true
            }
        })

        return user;
    }),

    studing: privateProcedure.query(async req => {
        const { user } = req.ctx.req
        
        const studySet = await prisma.user.findUnique({
            where: {
                id: user
            },
            include: {
                studySets: {
                    include: {
                        terms: true
                    }
                }
            }
        });

        return studySet;
    }),

    study: privateProcedure.input(z.object({
        studySetID: z.string()
    })).mutation(async req => {
        const { studySetID } = req.input;
        const { user } = req.ctx.req

        const studySet = await prisma.user.update({
            where: {
                id: user
            },
            data: {
                studySets: {
                    connect: {
                        id: studySetID
                    }
                }
            }
        });

        return studySet
    }),

    checkStudy: privateProcedure.input(z.object({
        studySetID: z.string()
    })).query(async req => {
        const { studySetID } = req.input;
        const { user } = req.ctx.req

        const studySet = await prisma.user.findUnique({
            where: {
                id: user
            },
            select: {
                studySets: {
                    where: {
                        id: studySetID
                    }
                }
            }
        })

        if (!studySet?.studySets[0])
            return false

        return true;
    })
})