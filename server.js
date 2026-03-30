const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 MongoDB Atlas Connection
mongoose.connect("mongodb+srv://livingstonkondepogu_db_user:DkTrg9YdQ6PtNe73@cluster0.3bsab2j.mongodb.net/quizora?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Atlas Connected ✅"))
  .catch(err => console.log(err));

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// PORT FIX FOR DEPLOYMENT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});