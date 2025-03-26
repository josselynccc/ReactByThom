import React from "react";
import { Navigate } from "react-router-dom";

interface Props{
    children:React.ReactNode
    isAuthenticated: boolean
}

export const PrivateRouter = ({children, isAuthenticated}:Props) =>{
    return !isAuthenticated ? <Navigate to={"/RegisterPage"}/> : children;
}