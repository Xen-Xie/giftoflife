import User from "../models/Users.js";

// Get All Users

export const getAllUsers = async (req,res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  }
  catch (error) {
    res.status(500).json({message: "Server Error"})
  }
}

// Delet User

export const deletUser = async (req,res) => {
  try{
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({message: "User Not Found"})
    } res.status(200).json({message: "User Deleted"})
  }
  catch (error){
    res.status(500).json({message: "Failed to delete user"})
  }
}

// Update user role
export const updateUserRole = async (req,res) => {
  const {role, isAdmin} = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.params.id, {role, isAdmin}, {new: true});
    if (!user){
      return res.status(404).json({message: "User Not Found"})
    } res.status(200).json({ message: "User role updated", user });
  }
  catch(error){
    res.status(500).json({ message: "Failed to update role" });
  }
}