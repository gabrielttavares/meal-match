import mongoose, { Schema, Document } from 'mongoose';

interface ITest extends Document {
    name: string;
    description: string;
    createdAt?: Date;
}

const TestSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const TestModel = mongoose.model<ITest>('Test', TestSchema);

export default TestModel;