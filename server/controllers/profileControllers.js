// controllers/profileController.js
import User from '../models/auth.js'

// Update user profile
export const updateUserProfile = async (req, res) => {
    console.log("sanna");
  const userId = req.params.userId;
  const { city, fromPlace, relationship, description } = req.body;
  const { profilePicture, coverPicture } = req.files;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update profile fields
    user.city = city;
    user.fromPlace = fromPlace;
    user.relationship = relationship;
    user.description = description;

    // Handle profile picture upload
    if (profilePicture && profilePicture.length > 0) {
      user.profilePicture = profilePicture[0].path; // Store the file path in the database or cloud storage
    }

    // Handle cover picture upload
    if (coverPicture && coverPicture.length > 0) {
      user.coverPicture = coverPicture[0].path; // Store the file path in the database or cloud storage
    }

    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

