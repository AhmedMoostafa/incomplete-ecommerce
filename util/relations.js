const User = require("../models/user");
const Cart = require("../models/cart");
const CartItem = require("../models/CartItem");
const Order = require("../models/order");
const Product = require("../models/product");
const OrderItem = require("../models/orderItem");
Product.belongsTo(User, { constrains: true, oneDelete: "CASCAD" });
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });

User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });
