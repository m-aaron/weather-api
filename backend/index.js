import express from "express";
import dotenv from "dotenv";
import weatherRoutes from "./src/routes/weatherRoute.js";
import cors from "cors";

dotenv.config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/weather", weatherRoutes)

app.listen(port, () => console.log(`App is listening to port: ${port}`));