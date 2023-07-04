import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { PrismaClient } from '@prisma/client';
import { StudySet, User } from "~/types";

const prisma = new PrismaClient();

export const studysetRouter = createTRPCRouter({
    get: privateProcedure.query(async (req) => {
        const userCreated = req.ctx.req.user;

        const studySets: StudySet[] = await prisma.studySet.findMany({
            where: {
                userCreated
            },
            include: {
                terms: true
            }
        })

        return studySets
    }),

    getOne: privateProcedure.input(z.object({
        id: z.string()
    })).query(async req => {
        const id = req.input.id;

        const studySet: StudySet | null = await prisma.studySet.findUnique({
            where: {
                id
            },
            include: {
                terms: true
            }
        });

        return studySet
    }),

    create: privateProcedure.input(z.object({
        title: z.string(),
        description: z.string(),
        terms: z.array(z.object({
            term: z.string(),
            definition: z.string(),
            order: z.number(),
            image: z.string()
        }))
    })).mutation(async req => {
        const { title, description, terms } = req.input;
        const userCreated = req.ctx.req.user ? req.ctx.req.user : '';

        const studySet: StudySet = await prisma.studySet.create({
            data: {
                title, 
                description, 
                userCreated,
                terms: {
                    create: terms.map(t => ({
                        term: t.term, definition: t.definition, order: t.order, image: t.image
                    }))
                }
            }
        })

        const student: User = await prisma.user.update({
            where: {
                id: userCreated
            },
            data:{
                studySets:{
                    connect: {
                        id: studySet.id
                    }
                }
            }
        })

        return studySet;
    }),

    edit: privateProcedure.input(z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        terms: z.array(z.object({
            id: z.string(),
            term: z.string(),
            definition: z.string(),
            order: z.number(),
            image: z.string()
        }))
    })).mutation(async req => {
        const { id, title, description, terms } = req.input;
        const userCreated = req.ctx.req.user;

        const studySet: StudySet = await prisma.studySet.update({
            where: {
                id
            },
            data: {
                title, 
                description, 
                userCreated,
                terms: {
                    update: terms.filter(t => t.id !== 'new term').map(t => ({
                        where: {
                            id: t.id
                        },
                        data: {
                            term: t.term, definition: t.definition, order: t.order
                        }
                    })),
                    create: terms.filter(t => t.id === 'new term').map(t => ({
                        term: t.term, definition: t.definition, order: t.order, image: t.image
                    })) 
                }
            }
        })

        return studySet;
    }),

    delete: privateProcedure.input(z.object({
        id: z.string()
    })).mutation(async req => {
        const { id } = req.input;

        const studySet: StudySet = await prisma.studySet.delete({
            where: {
                id
            }
        });

        return studySet
    }),

    search: privateProcedure.input(z.object({
        title: z.string()
    })).mutation(async req => {
        const { title } = req.input;

        const studySets: StudySet[] = await prisma.studySet.findMany({
            where: {
                title: {
                    contains: title
                }
            }
        });

        return studySets;
    })
})