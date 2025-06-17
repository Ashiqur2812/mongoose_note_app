import express, { Application, Request, Response } from 'express';
import { model, Schema } from 'mongoose';

const app: Application = express();

app.use(express.json());

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
},
    {
        versionKey: false,
        timestamps: true
    }
);

const Note = model('Note', noteSchema);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to note app');
});

app.get('/notes', async (req: Request, res: Response) => {
    const notes = await Note.find();
    res.status(200).json({
        success: true,
        message: 'everything is ok here',
        notes
    });
});

app.get('/note/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId;
    // const filter = { _id: noteId };
    const note = await Note.findById(noteId);

    res.status(200).json({
        success: true,
        message: 'So far so good',
        note
    });
});

app.post('/notes/create-note', async (req: Request, res: Response) => {
    const body = req.body;
    const note = await Note.create(body);

    res.status(201).json({
        success: true,
        message: 'Note has been created successfully',
        note
    });
});

app.patch('/note/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId;
    const updatedBody = req.body;
    const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true });

    res.status(201).json({
        success: true,
        message: 'Note has been updated successfully',
        note
    });
});

app.delete('/note/:noteId', async (req, res) => {
    const noteId = req.params.noteId;
    const note = await Note.findByIdAndDelete(noteId);

    res.status(200).json({
        success: true,
        message: 'note has been deleted successfully',
        note
    });
});

export default app;
