import {app} from "./app.js"
import dotenv from "dotenv";
import { connectDb } from "./db/index.js";


dotenv.config()
const port = process.env.PORT || 4000;




connectDb()
.then(
  () => {
    app.listen(port, (req, res) => {
      console.log(`server listening on port http://localhost:${port}`);
    });
  }
).catch((err)=>console.log(err));
