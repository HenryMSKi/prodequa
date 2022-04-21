import express, { json } from "express";
import inital from "./routes/initial.js";
import user from "./routes/user.js";
import cors from "cors";

const app = express();

app.use(json());

app.use(cors({
    origin: '*'
}));

app.use(inital);
app.use(user);

export default app;