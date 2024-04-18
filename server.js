import express from "express";
import router from "./Router/movieRouter.js";
import cors from 'cors';
var corsOptions = {
    origin:  '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'UPDATE', 'DELETE'],
    credentials:true
}
const app = express();
app.use(cors(corsOptions));
const PORT = 3000;
app.use(express.json());
app.use("/api/",router);
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})
