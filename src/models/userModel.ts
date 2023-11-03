import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: false, unique: true, sparse: true},
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('User', UserSchema);
