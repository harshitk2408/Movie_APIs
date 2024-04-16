import express from "express";
import router from "./Router/movieRouter.js";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use("/api/",router);
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})