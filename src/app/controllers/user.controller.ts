import express, { Request, Response } from 'express';
import { User } from '../models/user.models';

export const userRoutes = express.Router();

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
    const body = req.body;
    const user = await User.create(body);

    res.status(201).json({
        success: true,
        message: 'User data has been created successfully',
        user
    });
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
    const user = await User.findByIdAndDelete(userId);

    res.status(200).json({
        success: true,
        message: 'The user has been deleted successfully',
        user
    });
})


