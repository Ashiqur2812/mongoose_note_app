import express, { Request, Response } from 'express';
import { User } from '../models/user.models';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

export const userRoutes = express.Router();

const createUserZodSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number(),
    email: z.string(),
    password: z.string(),
    role: z.string().optional()
});

userRoutes.get('/', async (req: Request, res: Response) => {
    const user = await User.find();

    res.status(200).json({
        success: true,
        message: 'Everything is fine',
        user
    });
});

userRoutes.get('/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    res.status(200).json({
        success: true,
        message: 'You have found the data successfully',
        user
    });
});

userRoutes.post('/create-user', async (req: Request, res: Response) => {
    try {

        // const body = await createUserZodSchema.parseAsync(req.body);
        // console.log(body, 'zod body');

        const body = req.body;

        // const password = await bcrypt.hash(body.password, 10);
        // console.log(password);

        // const user = new User(body);
        // const password = await user.hashPassword(body.password);
        // console.log(password)

        // user.password = password;
        // await user.save();

        // built in and custom static method

        // const password = await User.hashPassword(body.password);
        // console.log(password, 'static');
        // body.password = password;

        // await user.save();
        const user = await User.create(body);
        res.status(201).json({
            success: true,
            message: 'User data has been created successfully',
            user: user
        });
    } catch (error: any) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error
        });
    }
});

userRoutes.patch('/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const updatedBody = req.body;
    const user = await User.findByIdAndUpdate(userId, updatedBody, { new: true });

    res.status(201).json({
        success: true,
        message: 'User data has been updated successfully',
        user
    });
});

userRoutes.delete('/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const filter = { _id: userId };
    // const user = await User.findByIdAndDelete(userId);
    const user = await User.findOneAndDelete(filter);

    res.status(200).json({
        success: true,
        message: 'The user has been deleted successfully',
        user
    });
})


