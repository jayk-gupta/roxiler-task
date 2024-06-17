const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/routes");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const PASSWORD = process.env.PASSWORD;

mongoose
  .connect(`mongodb+srv://jay:jay1234@cluster0.qgs52h0.mongodb.net/productDb`)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", router);

app.listen("3000", () => {
  console.log("App is running on port 3000");
});
