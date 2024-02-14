const Review = require("../models/reviewModel");
const createError = require("../utils/createError");
const Gig = require("../models/gigModel");

exports.createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "You cannot review as a seller"));

  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      userId: req.userId,
      gigId: req.body.gigId,
    });

    if (review)
      return next(createError(403, "You have already reviewed this gig"));

    Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    const savedReview = await newReview.save();

    return res.status(201).send(savedReview);
  } catch (error) {
    next(error);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });

    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (review.userId !== req.userId)
      return next(createError(403, "You cannot delete this review"));

    await Review.findByIdAndDelete(req.params.id);

    Gig.findByIdAndUpdate(review.gigId, {
      $inc: { totalStars: -review.star, starNumber: -1 },
    });

    res.status(200).send("Review has been deleted");
  } catch (error) {
    next(error);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    const gig = await Gig.findById(review.gigId);

    if (review.userId !== req.userId)
      return next(createError(403, "You cannot update this review"));

    const oldStar = review.star;
    const newStar = req.body.star ? req.body.star : oldStar;
    const newDesc = req.body.desc ? req.body.desc : review.desc;

    Gig.findByIdAndUpdate(review.gigId, {
      $inc: { totalStars: newStar - oldStar },
      $set: { desc: newDesc, star: newStar },
    });

    await Review.findByIdAndUpdate(req.params.id, {
      desc: newDesc,
      star: newStar,
    });

    res.status(200).send("Review has been updated");
  } catch (error) {
    next(error);
  }
};
