import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/CartRoute.js';
import orderRouter from './routes/orderRoutes.js';


const app = express();
const port = process.env.PORT || 4000;

// Remove MongoDB/Mongoose and MongoDB config imports
// Remove connectDB() and any mongoose.connect code

connectCloudinary();

app.use(express.json());
app.use(cors());

/* catch-all logging middleware */
app.use((req, res, next) => {
  console.log('TOP LEVEL:', req.method, req.url);
  next();
});

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log('Server started on Port: ' + port));

app.use((req, res) => {
  console.log(`Unhandled request: ${req.method} ${req.url}`);
  res.status(404).send("Route not found");
});