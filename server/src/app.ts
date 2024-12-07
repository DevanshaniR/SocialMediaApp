import express from "express";
import cors from "cors";
import { router } from './routes'; 

//server

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
