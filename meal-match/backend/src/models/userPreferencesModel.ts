import mongoose from "mongoose";

const UserPreferenceSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true,
    },
    preferences: {
        type: [String],
        default: [],
    },
    location: {
        type: String,
        required: true,
    }
});

const UserPreference = mongoose.model('UserPreference', UserPreferenceSchema);

export default UserPreference;