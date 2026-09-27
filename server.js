// imports
const express = require("express"); 
const app = express(); 
const dotenv = require("dotenv").config(); 
const morgan = require("morgan");
const session = require("express-session");
const methodOverride = require("method-override");
const connectToDB = require("./db.js");
const {MongoStore} = require("connect-mongo");
const dns = require('dns')
dns.setServers(['8.8.8.8', '1.1.1.1'])

// middleware imports
const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");
const isAdmin = require("./middleware/is-admin.js");

// routes Imports
const authController = require("./routes/auth.routes.js");
const indexController = require("./routes/index.routes.js");
const beanController = require("./routes/beans.routes.js");
const coffeeToolController = require("./routes/coffeetools.routes.js");
const orderController = require("./routes/orders.routes.js");
const shippingCompanyController = require("./routes/shippingcompany.routes.js");
const dashboardRoutes = require("./routes/dashboard.routes");
const cartController = require("./routes/cart.routes.js"); 

// Middleware
app.use(express.static("public")); 
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));

// Session configuration using connect-mongo
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions"
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

app.use(passUserToView);

// Routes go here
app.use("/auth", authController);
app.use("/", indexController);
app.use("/beans", beanController);
app.use("/coffee-tools", coffeeToolController);
app.use("/cart", cartController);
app.use("/orders", orderController);
app.use("/shipping-companies", shippingCompanyController);
app.use("/", dashboardRoutes);

// connect to database and listen on Port 3000
async function startServer() {
  const PORT = process.env.PORT || 3000;
  await connectToDB();

  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
}

startServer();