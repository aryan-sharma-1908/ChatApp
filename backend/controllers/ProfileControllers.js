import User from '../models/UserModel.js';

export const getProfile = async (req, res) => {
    try {
        const { name, avatar, description } = req.body;
        const userId = req.user._id;

        const user = await User.findByIdAndUpdate(userId, {
            name,
            avatar,
            description, 
            profileSetup: true
        });

        res.status(200).json({
            success: true,
            user: {
                _id : user._id,
                name: user.name
            },
            message: "Profile updated successfully"
        })


    } catch (error) {
        console.error("Error fetching profile: ", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching profile"
        })
    }
}