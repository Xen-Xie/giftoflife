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
    const {
      bloodGroup,
      sortBy = "createdAt",
      order = "desc",
      division,
      district,
      q,
    } = req.query;

    const filter = {};

    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (division) filter["address.division"] = division;
    if (district) filter["address.district"] = district;

    // Handle keyword search
    if (q) {
      const regex = new RegExp(q, "i"); // case-insensitive match
      filter.$or = [
        { fullName: regex },
        { "address.division": regex },
        { "address.district": regex },
      ];
    }

    const sortOption = {};
    sortOption[sortBy] = order === "desc" ? -1 : 1;

    const users = await User.find(filter)
      .select("fullName bloodGroup address email phoneNumber lastDonated")
      .sort(sortOption);

    res.status(200).json(users);
  } catch (error) {
    console.error("User search error:", error);
    res.status(500).json({ message: "Search failed" });
  }
};
// Count all the controllers
export const getStats = async (req, res) => {
  try {
    const total = await User.countDocuments();
    res.status(200).json({ total });
  } catch (error) {
    res.status(500).json({ message: "Failed to get stats" });
  }
};

// Get Single User

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};
