import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import recipeRoutes from './routes/recipeRoutes';
import testRoutes from './routes/testRoutes';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

app.use('/api/recipes', recipeRoutes);
app.use(testRoutes);

