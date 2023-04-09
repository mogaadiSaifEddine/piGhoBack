const express = require("express");
const router = express.Router();
const validate = require("../middleware/schemaValidation");

const { authorize, AUTH_ROLES } = require("../middleware/auth");
const { USER } = AUTH_ROLES;
const { upload } = require("../utils/upload");
const {
  updatePassword,
  updateProfile,
  updateCoverPhoto,
  updatePicture,
  updateCV,
} = require("../controller/controller.user");
const { userProfile } = require("../validators/validators.user");
const { changePassword } = require("../validators/validators.changePassword");
router.put("/:id", authorize([USER]), validate(userProfile), updateProfile);
router.put(
  "/password",
  authorize([USER]),
  validate(changePassword),
  updatePassword
);
router.put(
  "/coverPhoto",
  authorize([USER]),
  upload.single("coverPhoto"),
  updateCoverPhoto
);
router.put(
  "/picture",
  authorize([USER]),
  upload.single("picture"),
  updatePicture
);
router.put("/cv", authorize([USER]), upload.single("cv"), updateCV);
router.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json({ file: req.file });
});
//update profile
//experience popup
//logout
//private route admin and user
//upload file
module.exports = router;
