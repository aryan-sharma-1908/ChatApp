import User from '../models/UserModel.js'

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({
            _id: { $ne: req.user._id}
        }).select('name avatar description');
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


export const updateProfile = async (req, res) => {
    try {
        const { name, avatar, description } = req.body;
        const userId = req.user._id;

        const user = await User.findByIdAndUpdate(userId, {
            name,
            avatar,
            description, 
            profileSetup: true
        }, { new: true});

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

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

export const getNonFriends = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select('friends');
        
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const nonFriends = await User.find({
            _id: { $nin: [...user.friends, userId]}
        }).select('name avatar description');
        
        if(nonFriends.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No non-friends found",
                nonFriends: []
            })
        }

        res.status(200).json({
            success: true,
            message: "Non-friends fetched successfully",
            nonFriends
        })

    } catch (error) {
        console.error("Error in getNonFriends: ", error);
         res.status(500).json({
            success: false,
            message: "Server error while getting non-friends"
        })
    }
}

export const addFriendIfNotExists = async (req, res) => {
    try {
        const userId = req.user._id;
        const { friendId } = req.body;

        if(userId.toString() === friendId) {
            return res.status(400).json({
                success: false,
                message: "Cannot add yourself as a friend"
            })
        }

        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if(!user || !friend) {
            return res.status(404).json({
                success: false,
                message: "User or Friend not found"
            })
        }

        if(user.friends.includes(friendId)) {
            return res.status(400).json({
                success: false,
                message: "User is already a friend"
            })
        }

        await User.findByIdAndUpdate(userId, {
            $addToSet: { friends: friendId}
        })
        await User.findByIdAndUpdate(friendId, {
            $addToSet: { friends: userId}
        })

        res.status(200).json({
            success: true,
            message: "Friend added successfully"
        })

    } catch (error) {
        console.error("Error in addFriendIfNotExists: ", error);
        res.status(500).json({
            success: false,
            message: "Server error while adding friend"
        })
    }
}

export const getFriends = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select('friends').populate('friends', 'name avatar description');
        
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Friends fetched successfully",
            friends: user.friends
        })
    } catch (error) {
        console.error("Error in getFriends: ", error);
        res.status(500).json({
            success: false,
            message: "Server error while getting friends"
        })
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not found."
            })
        }
        res.status(200).json({
            success: true,
            user,
            message: "User found."
        })
    } catch (error) {
        console.error("Error in getUserInfo: ", error);
        res.status(500).json({
            success: false,
            message: "Error in getting user info"
        })
    }
}