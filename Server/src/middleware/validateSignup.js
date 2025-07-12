import validator from "validator";

export const validateSignup = (req, res, next) => {
  const { fullName, email, password, bloodGroup, phoneNumber, address, age } = req.body;
  if (!fullName || !email || !password || !bloodGroup || !phoneNumber || !address || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  if (!validator.isMobilePhone(phoneNumber, 'bn-BD')) {
    return res.status(400).json({ message: "Invalid phone number format" });
  }
  if (parseInt(age) < 18 || parseInt(age) > 65) {
    return res.status(400).json({ message: "Age must be between 18 and 65" });
  }
  next();
}