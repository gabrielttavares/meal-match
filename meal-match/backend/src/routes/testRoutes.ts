import express, { Request, Response, Router } from 'express';
import TestModel from "../models/TestModel";

const router = express.Router();

router.post('/api/test-db', async (req, res) => {
    try {
        const { name, description } = req.body;
        const newTestRecord = new TestModel({ name, description });
        const savedRecord = await newTestRecord.save();
        res.status(201).json(savedRecord);
    } catch (error) {
        console.error('Error creating record:', error);
        res.status(500).json({ message: 'Error creating record', error });
    }
});

/**
 * Read all test records
 */
router.get('/api/test-db', async (req, res) => {
    try {
        const records = await TestModel.find();
        res.status(200).json(records);
    } catch (error) {
        console.error('Error reading records:', error);
        res.status(500).json({ message: 'Error reading records', error });
    }
});

router.put('/api/test-db/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body as { name: string; description: string };

        const updatedRecord = await TestModel.findByIdAndUpdate(
            id,
            { name, description },
            { new: true } // Return the updated document
        );

        if (!updatedRecord) {
            return res.status(404).json({ message: 'Record not found' });
        }

        res.status(200).json(updatedRecord);
    } catch (error) {
        console.error('Error updating record:', error);
        res.status(500).json({ message: 'Error updating record', error });
    }
});

/**
 * Delete a test record by ID
 */
router.delete('/api/test-db/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;

        const deletedRecord = await TestModel.findByIdAndDelete(id);

        if (!deletedRecord) {
            return res.status(404).json({ message: 'Record not found' });
        }

        res.status(200).json({ message: 'Record deleted', deletedRecord });
    } catch (error) {
        console.error('Error deleting record:', error);
        res.status(500).json({ message: 'Error deleting record', error });
    }
});

export default router;