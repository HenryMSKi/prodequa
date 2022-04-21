import app from "./app.js";
import dotenv from "dotenv/config";

/* const port = 3000; */

app.listen(process.env.PORT || 8080/* , "127.0.0.2" */, () => {
    console.log("Hola");
});