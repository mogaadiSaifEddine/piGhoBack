const Users = require("../models/model.user");
const Companies = require("../models/model.company");
const updatePassword = async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  const match = await user.matchPassword(req.body.password);
  if (!match) return res.status(400).json({ error: "wrong password" });
  user.password = req.body.newPassword;
  await user.save();
  return res.status(200).json("password updated");
};
const updateProfile = async (req, res) => {
  const {  role, email } = req;
  const id = req.params.id;
  if (role == "user" || role == "expert") {
    await Users.findByIdAndUpdate(id, req.body);
    return res.status(200).json("profile updated");
  }
  if (role == "company") {
    await Companies.findByIdAndUpdate(id, req.body);
    return res.status(200).json("profile updated");
  }
};
const updateCoverPhoto = async (req, res) => {
  const { id, role, email } = req;
  if (role == "user" || role == "expert") {
    await Users.findByIdAndUpdate(id, { coverPhoto: req.file.path });
    return res.status(200).json("cover photo updated");
  }
  if (role == "company") {
    await Companies.findByIdAndUpdate(id, { coverPhoto: req.file.path });
    return res.status(200).json("cover photo updated");
  }
};
const updatePicture = async (req, res) => {
  const { id, role, email } = req;
  if (role == "user" || role == "expert") {
    await Users.findByIdAndUpdate(id, { picture: req.file.path });
    return res.status(200).json("picture updated");
  }
  if (role == "company") {
    await Companies.findByIdAndUpdate(id, { picture: req.file.path });
    return res.status(200).json("picture updated");
  }
};
const updateCV = async (req, res) => {
  const { id, role, email } = req;
  if (role == "user" || role == "expert") {
    await Users.findByIdAndUpdate(id, { cv: req.file.path });
    return res.status(200).json("cv updated");
  } else return res.status(403).json("Access denied");
};
module.exports = {
  updatePassword,
  updateProfile,
  updateCoverPhoto,
  updatePicture,
  updateCV,
};
