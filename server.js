const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const gigRoute = require("./routes/gigRoute");
const orderRoute = require("./routes/orderRoute");
const conversationRoute = require("./routes/conversationRoute");
const messageRoute = require("./routes/messageRoute");
const reviewRoute = require("./routes/reviewRoute");
const authRoute = require("./routes/authRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
dotenv.config();

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

app.use(cors({ credentials: true, origin: "http://localhost:8800" }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).send(errorMessage);
});

const port = process.env.PORT || 8800;

app.listen(port, () => {
  connect();
  console.log("Backend server is running!");
});
