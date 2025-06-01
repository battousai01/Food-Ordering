import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

const prisma = new PrismaClient();

const addProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const image = req.file;

        if (!image) {
            return res.json({ success: false, message: "Please upload image" });
        }

        let result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            image: result.secure_url,
            created_at: new Date()
        };

        const product = await prisma.product.create({ data: productData });

        res.json({ success: true, message: "Product added successfully", product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Could not add product" });
    }
};

const listProduct = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        console.log('products from DB:', products); 
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.json({ success: false, message: "Product id is required" });
        }

        // Delete related cart items
        await prisma.cartItem.deleteMany({
            where: { productId: Number(id) }
        });

        // Delete related order items (if you have this relation)
        await prisma.orderItem.deleteMany({
            where: { productId: Number(id) }
        });

        // Now delete the product
        await prisma.product.delete({
            where: { id: Number(id) }
        });

        res.json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await prisma.product.findUnique({ where: { id: productId } });
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addProduct, listProduct, removeProduct, singleProduct };