import User  from '../models/User.js';
import UserProgress  from '../models/UserProgress.js';

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select('-password');
    const progress = await UserProgress.findOne({ userId });

    res.json({
      user,
      progress,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, age, userType } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, age, userType },
      { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
