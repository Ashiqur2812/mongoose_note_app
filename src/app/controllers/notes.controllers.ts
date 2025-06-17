import express, { Request, Response } from "express";
import { Note } from "../models/notes.models";

export const notesRoutes = express.Router()

notesRoutes.get('/', async (req: Request, res: Response) => {
    const notes = await Note.find();
    res.status(200).json({
        success: true,
        message: 'everything is ok here',
        notes
    });
});

notesRoutes.get('/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId;
    // const filter = { _id: noteId };
    const note = await Note.findById(noteId);

    res.status(200).json({
        success: true,
        message: 'So far so good',
        note
    });
});

notesRoutes.post('/create-note', async (req: Request, res: Response) => {
    const body = req.body;
    const note = await Note.create(body);

    res.status(201).json({
        success: true,
        message: 'Note has been created successfully',
        note
    });
});

notesRoutes.patch('/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId;
    const updatedBody = req.body;
    const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true });

    res.status(201).json({
        success: true,
        message: 'Note has been updated successfully',
        note
    });
});

notesRoutes.delete('/:noteId', async (req, res) => {
    const noteId = req.params.noteId;
    const note = await Note.findByIdAndDelete(noteId);

    res.status(200).json({
        success: true,
        message: 'note has been deleted successfully',
        note
    });
});
