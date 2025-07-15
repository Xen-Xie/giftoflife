import User from "../models/Users.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude passwords
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
export const searchUsers = async (req, res) => {
  try {
    const { bloodGroup, sortBy = "createdAt", order = "desc" } = req.query;

    const filter = {};
    if (bloodGroup) filter.bloodGroup = bloodGroup;

    const sortOption = {};
    sortOption[sortBy] = order === "desc" ? -1 : 1;

    const users = await User.find(filter)
      .select("fullName bloodGroup address email")
      .sort(sortOption);

    res.status(200).json(users);
  } catch (error) {
    console.error("User search error:", error);
    res.status(500).json({ message: "Search failed" });
  }
};

