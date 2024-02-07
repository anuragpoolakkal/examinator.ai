import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import valuatorRouter from "./routes/valuators.js";
import examRouter from "./routes/exam.js";
import courseRouter from "./routes/course.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/valuators", valuatorRouter);
app.use("/exams", examRouter);
app.use("/courses", courseRouter);

app.get("/", (req, res) => {
    res.send("Examinator.AI");
});

async function connectDB() {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");
}


const port = process.env.PORT || 8080;

connectDB();
app.listen(8080, () => {
    console.log(`Server at http://localhost:${port}`);
});