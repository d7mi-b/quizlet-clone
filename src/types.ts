import { JwtPayload } from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next/types"

export interface RequestType extends NextApiRequest {
    user?: string
}

export type OptionsType = {
    req: RequestType,
    res: NextApiResponse
}

export interface TokenValid extends JwtPayload {
    id: string, 
}

export interface User {
    id: string
    username: string,
    DOB: Date
    email: string
    password: string
    studySets?: StudySet[]
    avatar?: string | null
}

export interface Term {
    id: string;
    term: string;
    definition: string;
    order: number;
    image: string | null;
    studySetID: string;
}

export interface StudySet {
    id: string;
    title: string;
    description: string | null;
    userCreated: string;
    terms?: Term[]
}