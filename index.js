import express from 'express';
import userRoutes from './routes/userRoutes.js';
import db from './config/db.js';

// Create app
const app = express();

// Enable data from forms
app.use( express.urlencoded({ extended: true}));

// Connect to database
try {
    await db.authenticate();
    db.sync();
    console.log('Connected to the database Successfully');
    
} catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
}

// Enable Pug 
app.set('view engine', 'pug');
app.set('views', './views');

// Public Folder
app.use(express.static('public'));
app.use('/auth', userRoutes);




// Port & Start project
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));