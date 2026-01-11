import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    color: {
        type: Number,
        required: false
    },
    profileSetup: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next();

    const passwordHash = await bcrypt.hash(user.password, 10);
    user.password = passwordHash;
    next();
})

const UserModel = mongoose.model('User', userSchema);

export default UserModel;