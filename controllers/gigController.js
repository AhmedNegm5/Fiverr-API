const Gig = require("../models/gigModel");
const createError = require("../utils/createError");

exports.createGig = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, "Only sellers can create gigs"));

  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (error) {
    next(error);
  }
};

exports.deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found"));

    if (gig.userId.toString() !== req.userId)
      return next(createError(403, "You can only delete your own gigs"));

    await gig.deleteOne();
    res.status(204).send("Gig deleted");
  } catch (error) {
    next(error);
  }
};

exports.getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found"));
    res.status(200).send(gig);
  } catch (error) {
    next(error);
  }
};

exports.getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.maz) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };

  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
  } catch (error) {
    next(error);
  }
};
