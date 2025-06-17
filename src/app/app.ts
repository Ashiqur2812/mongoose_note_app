import express, { Application, Request, Response } from 'express';
import { model, Schema } from 'mongoose';

const app: Application = express();

const noteSchema = new Schema({
    title: String,
    content: String,
    publishDate: Date
});

const Note = model('Note', noteSchema);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to note app');
});

app.post('/create-note',async (req: Request, res: Response) => {
    const myNote = new Note({
        title: 'learning mongoose',
        content: 'I am learning mongoose',
        publishDate: '2020-04-12'
    });

    await myNote.save()
    
    res.status(201).json({
        success: true,
        message: 'Note created successfully',
        note: myNote
    });
});

export default app;
