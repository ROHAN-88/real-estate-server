import express from "express";
import db_connect from "./db_connect.js";
import userRouter from "./users/users.routes.js";
import propertiesRoutes from "./properties/properties.routes.js";
import cors from "cors";

const app = express();
app.use(express.json());

//!acces control : giving acess control to all the fornt end source code
app.use(cors());

/*//! Routes */
app.use(userRouter);
app.use(propertiesRoutes);

/*//!Database */
await db_connect();

/*//!PORT */

const port = process.env.API_PORT;

app.listen(port, () => {
  console.log(`App is listening at ${port}`);
});
