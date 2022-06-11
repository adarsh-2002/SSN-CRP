import 'dotenv/config'
import express, { urlencoded, json,} from 'express';
const app = express();
import { join } from 'path';
import cors from 'cors';
import verifyJWT from './middleware/verifyJWT.js';
import cookieParser from 'cookie-parser';
import credentials from './middleware/credentials.js';
import connection from 'mongoose';
import connectDB from './config/dbConnection.js';
import corsOptions from './config/corsOptions.js';
const PORT = process.env.PORT || 3500;
import path from 'path';
import {fileURLToPath} from 'url';
import root from './routes/root.js'
import register from './routes/register.js'
import auth from './routes/auth.js'
import refresh from './routes/refresh.js'
import logout from './routes/logout.js'
import students from './routes/api/students.js'
import users from './routes/api/users.js'
import bodyParser from 'body-parser';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);

// Connect to MongoDB
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));
app.use(bodyParser.json());
// built-in middleware to handle urlencoded form data
app.use(urlencoded({ extended: false }));

// built-in middleware for json 
app.use(json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(join(__dirname, '/public')));

// routes
app.use('/',root);
app.use('/register', register);
app.use('/auth', auth);
app.use('/refresh', refresh);
app.use('/logout', logout);

app.use(verifyJWT);
app.use('/students', students);
app.use('/users', users);

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

connection.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});