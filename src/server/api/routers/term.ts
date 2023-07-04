import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const termRouter = createTRPCRouter({
    delete: privateProcedure.input(z.object({
        id: z.string()
    })).mutation(async req => {
        const { id } = req.input;

        const term = await prisma.term.delete({
            where: {
                id
            }
        })

        return term;
    }),

    edit: privateProcedure.input(z.object({
        id: z.string(),
        studySetID: z.string()
    })).mutation(async req => {
        const { id, studySetID } = req.input;
        
        const term = await prisma.term.update({
            where: {
                id
            },
            data: {
                studySetID
            }
        });

        return term
    })
})