import User from '../models/UserModel.js'

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({
            success: true,
            users,
            message: 'Users fetched successfully'
        })
    } catch (error) {
        console.error('Error in getUsers: ', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
}