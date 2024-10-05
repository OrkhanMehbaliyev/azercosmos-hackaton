require("dotenv").config();
const express = require("express");
const Router = require("./routes");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({ useTempFiles: true }));
app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use("/", Router);

app.listen(PORT, () => console.log(`Server heard on PORT: ${PORT}`));
