import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import {placeorder,verifyStripe,placeOrderStripe,allOrder,userOrder,updateStatus} from '../controllers/orderController.js'

console.log('orderRoutes.js loaded');/*log to check if this file is loaded*/
const orderRouter = express.Router()

orderRouter.post('/list',adminAuth,allOrder)
orderRouter.post('/status',adminAuth,updateStatus)
orderRouter.post('/place', authUser, placeorder)
/*Debug log for TypeError: Cannot read properties of null (reading 'cartData')*/
/*orderRouter.post('/place', authUser, (req, res, next) => {
  console.log('Route handler for /place called');
  next();
}, placeorder)*/
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/userorders', authUser, userOrder)


orderRouter.post('/verifyStripe', authUser, verifyStripe)

export default orderRouter