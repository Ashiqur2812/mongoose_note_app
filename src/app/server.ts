import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
let server: Server;
const PORT = 4000;

async function main() {
    try {
        await mongoose.connect('mongodb+srv://todoapp:todoapp@cluster0.yt5iw.mongodb.net/advanced-note-app?retryWrites=true&w=majority&appName=Cluster0')
        console.log('Connected to mongoDB using mongoose')
        server = app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main()
