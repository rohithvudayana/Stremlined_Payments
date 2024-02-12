import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import * as CustomErrors from "../errors"
import asyncWrapper from "../helpers/asyncWrapper";
import { hashPassword } from "../helpers/hashPassword";

export const loginController = asyncWrapper(
    async ( _req: Request, _res: Response, _next: NextFunction ) => {
        const {email, password } = _req.body;
        if(!email || !password)
            return _next(
                CustomErrors.BadRequestError("Please provide email and password")
            );
        const user = await User.findOne ({email : email});
        if(!user)
            return _next(
                CustomErrors.NotFoundError("Invalid email or user does not exist")
            )
        if(!user.password)
            return _next(
                CustomErrors.InternalServerError("User password not found in the databse")
            )
    }
)

export const registerController = asyncWrapper(
    async (_req: Request, _res:Response, _next:NextFunction ) => {
        if(_req.body.name || _req.body.email || _req.body.password ) 
            return _next(
                CustomErrors.BadRequestError("please provide all required fields")
            )
        const user = await User.findOne({email : _req.body.email});
        if(user)
            return _next(
                CustomErrors.BadRequestError("User already exists")
            )
        else{
            try{
                const hashedPassword = hashPassword(_req.body.password);
            }
        }
    }
)














