import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
//import userModel from '../models/userModel.js'; // Assuming you have a user model
//import productModel from '../models/productModel.js'; // Assuming you have a product model

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const currency = 'usd'
const deliverCharge = 12

const placeorder = async (req, res) => {
    console.log('placeorder controller called');
    try {
        const userId = Number(req.userId);
        console.log('userId:', userId);
        const { amount, address, items } = req.body;
        if (!userId || !items || items.length === 0) {
            return res.json({ success: false, message: "User not found or cart is empty" });
        }

        const userData = await prisma.user.findUnique({ where: { id: userId } });
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        const orderData = {
            userId: userId,
            items: items,
            amount: amount,
            address: address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
            status: "Placed"
        };

        console.log('Order data to save:', orderData);

        await prisma.order.create({
            data: {
                userId: userId,
                items: items,
                amount: amount,
                address: address,
                paymentMethod: "COD",
                payment: false,
                date: Date.now(),
                status: "Placed"
            }
        });
        /*
        await prisma.user.update({
            where: { id: userId },
            data: { cartData: {} }
        });*/

        await prisma.cartItem.deleteMany({
            where: { userId: userId }
        });

        res.json({ success: true, message: "Order Placed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Order could not be placed" });
    }
};

const placeOrderStripe = async (req, res) => {
    try {
        const userId = Number(req.userId);
        const { amount, address, items } = req.body;
        const origin = req.headers.origin || 'http://localhost:5173';

        const userData = await prisma.user.findUnique({ where: { id: userId } });
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Build Stripe line_items from items array
        const line_items = items.map(item => ({
            price_data: {
                currency: currency,
                product_data: { name: item.name },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        // Add delivery charge
        line_items.push({
            price_data: {
                currency: currency,
                product_data: { name: "Delivery Charge" },
                unit_amount: deliverCharge * 100,
            },
            quantity: 1,
        });

        // Create order in DB (optional: set payment: false, paymentMethod: "Stripe")
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
            status: "Placed"
        };
        const newOrder = await prisma.order.create({ data: orderData });

        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder.id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder.id}`,
            line_items,
            mode: "payment"
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const verifyStripe = async (req, res) => {
    try {
        const { orderId, success, userId } = req.body;
        console.log("verifyStripe called", req.body);

        if (success === 'true') {
            const updated = await prisma.order.update({
                where: { id: Number(orderId) },
                data: { payment: true }
            });
            console.log("Order updated:", updated);
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "Payment not successful" });
        }
    } catch (error) {
        console.log("verifyStripe error:", error);
        res.json({ success: false, message: "Error updating payment status" });
    }
};

const allOrder = async (req, res) => {
    try {
        const orders = await prisma.order.findMany();
        // Convert BigInt fields to Number or String
        const safeOrders = orders.map(order => ({
            ...order,
            date: Number(order.date), // or .toString() if you prefer
        }));
        res.json({ success: true, orders: safeOrders });
    } catch (error) {
        console.log(error);
        //res.json({ success: false, message: "Could not fetch order" });
    }
};

const userOrder = async (req, res) => {
    try {
        const userId = Number(req.userId);
        const orders = await prisma.order.findMany({
            where: { userId },
            orderBy: { date: 'desc' }
        });

        // Convert BigInt date to Number for each order
        const safeOrders = orders.map(order => ({
            ...order,
            date: Number(order.date), // or .toString() if you prefer
        }));

        res.json({ success: true, orders: safeOrders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Could not fetch order" });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await prisma.order.update({
            where: { id: orderId },
            data: { status }
        });
        res.json({ success: true, message: "Order Status updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { placeorder,verifyStripe, placeOrderStripe, allOrder, userOrder, updateStatus };