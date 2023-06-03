require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectdb = require("./db/connect");
const PORT = process.env.PORT || 4000;
const product_routes = require("./routes/product");
const order_routes = require("./routes/order");

// Increase payload size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/upload', express.static('upload'));
// Enable CORS
app.use(cors());

// Set routes
app.use("/api/product", product_routes);
app.use("/api/order", order_routes);

const start = async () => {
  try {
    await connectdb(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
