import express, { Application, Request, Response } from 'express';
import { model, Schema } from 'mongoose';

const app: Application = express();

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        default: '',
    },
    category: {
        type: String,
        enum: ['personal', 'work', 'study', 'other'],
        default: 'personal'
    },
    pinned: {
        type: Boolean,
        default: false
    },
    tags: {
        label: { type: String, required: true },
        color: { type: String, default: 'Black' }
    }
});

const Note = model('Note', noteSchema);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to note app');
});

app.post('/create-note', async (req: Request, res: Response) => {
    const myNote = new Note({
        title: 'Learning super excited mongoose',
        tags: {
            label: 'database'
        }
    });

    await myNote.save();

    res.status(201).json({
        success: true,
        message: 'Note has been created successfully',
        note: myNote
    });
});


export default app;
