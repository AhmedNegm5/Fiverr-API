const createError = require("../utils/createError");
const Order = require("../models/orderModel");
const Gig = require("../models/gigModel");
const Stripe = require("stripe");

exports.intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  const gig = await Gig.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    img: gig.img,
    title: gig.title,
    price: gig.price,
    sellerId: gig.userId,
    buyerId: req.userId,
    paymentIntent: paymentIntent.id,
  });

  await newOrder.save();

  res.status(200).send({ clientSecret: paymentIntent.client_secret });
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
};

exports.confirm = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { paymentIntent: req.body.paymentIntent },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order confirmed!");
  } catch (err) {
    next(err);
  }
};
