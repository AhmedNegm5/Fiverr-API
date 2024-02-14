const User = require("../models/userModel");
const createError = require("../utils/createError");
const bcrypt = require("bcrypt");

exports.deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can only delete your own account"));
  }

  await user.deleteOne();
  res.status(200).send("User has been deleted!");
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found"));

    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can only get your own account"));
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(createError(404, "User not found"));

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can only update your own account"));
  }

  if (req.body.password) {
    return next(createError(400, "Use /changePassword to change password"));
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(createError(404, "User not found"));

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can only change your own password"));
  }

  const oldPass = req.body.oldPassword;
  const newPass = req.body.newPassword;
  const comparePass = await bcrypt.compareSync(oldPass, user.password);

  if (!comparePass) {
    return next(createError(400, "Old password is incorrect"));
  }

  const hash = await bcrypt.hash(newPass, 5);

  try {
    user.password = hash;
    await user.save();

    res.status(200).send("Password has been changed!");
  } catch (error) {
    next(error);
  }
};
