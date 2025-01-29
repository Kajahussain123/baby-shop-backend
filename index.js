require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require('./Routes/User/Auth')
const categoryRoutes=require('./Routes/Admin/CategoryRoutes')
const userCategoryRoutes=require('./Routes/User/CategoryRoutes')
const brandRoutes=require('./Routes/Admin/BrandRoutes')
const userbrandRoutes=require('./Routes/User/BrandRoutes')
const productRoutes=require('./Routes/Admin/ProductRoutes')
const userProductRoutes=require('./Routes/User/ProductRoutes')
const userCarousalRoutes=require('./Routes/User/CarousalRoutes')
const carousalRoutes=require('./Routes/Admin/CarousalRoutes')
const wishlistRoutes=require('./Routes/User/WishlistRoutes')
const cartRoutes=require('./Routes/User/CartRoutes')
const checkoutRoutes=require('./Routes/User/CheckoutRoutes')
const orderRoutes=require('./Routes/Admin/OrderRoutes')
const userOrderRoutes=require('./Routes/User/OrderRoutes')
const userAddressRoutes=require('./Routes/User/AddressRoutes')
const useradminRoutes=require('./Routes/Admin/UserRoutes')
const authAdminRoutes=require('./Routes/Admin/AuthRoutes')


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
require('./DB/connection');


// user routes
app.use('/api/user/auth',userRoutes)
app.use('/api/user/category',userCategoryRoutes)
app.use('/api/user/brand',userbrandRoutes)
app.use('/api/user/product',userProductRoutes)
app.use('/api/user/carousal',userCarousalRoutes)
app.use('/api/user/wishlist',wishlistRoutes)
app.use('/api/user/cart',cartRoutes)
app.use('/api/user/checkout',checkoutRoutes)
app.use('/api/user/order',userOrderRoutes)
app.use('/api/user/address',userAddressRoutes)


// admin routes
app.use('/api/admin/category',categoryRoutes)
app.use('/api/admin/brand',brandRoutes)
app.use('/api/admin/product',productRoutes)
app.use('/api/admin/carousal',carousalRoutes)
app.use('/api/admin/order',orderRoutes)
app.use('/api/admin/users',useradminRoutes)
app.use('/api/admin/auth',authAdminRoutes)



// Static File Serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Server Configuration
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server started listening at PORT ${PORT}`);
});
