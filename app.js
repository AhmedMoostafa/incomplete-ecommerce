const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(user);
    });
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

require("./util/relations.js");
sequelize
  .sync()
  .then((res) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      User.create({
        name: "ahmed",
        email: "ahmed.moahmed442@gmail.com",
      }).then((us) => {
        us.createCart();
      });
    }
    return user;
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
