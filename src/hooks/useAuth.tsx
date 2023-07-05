'use client';

import { AuthContext, State } from "../context/AuthContext";
import { useContext } from "react";


export function useAuth() {
    return useContext(AuthContext) as State;
}