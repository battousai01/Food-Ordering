import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Add product to user cart

 const addToCart = async (req, res) => {
  try {
    const userId = req.userId; // Set by your auth middleware
    const { itemId } = req.body;

    // Check if the cart item already exists
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: { userId, productId: Number(itemId) }
      }
    });

    if (existingCartItem) {
      // If exists, increment quantity
      await prisma.cartItem.update({
        where: {
          userId_productId: { userId, productId: Number(itemId) }
        },
        data: {
          quantity: { increment: 1 }
        }
      });
    } else {
      // If not, create new cart item
      await prisma.cartItem.create({
        data: {
          userId,
          productId: Number(itemId),
          quantity: 1
        }
      });
    }

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update cart item quantity
const updateCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { itemId, quantity } = req.body;

        // Check if the cart item exists
        const existingCartItem = await prisma.cartItem.findUnique({
            where: {
                userId_productId: { userId, productId: Number(itemId) }
            }
        });

        if (existingCartItem) {
            // Update quantity
            await prisma.cartItem.update({
                where: {
                    userId_productId: { userId, productId: Number(itemId) }
                },
                data: { quantity }
            });
        } else {
            // Create new cart item
            await prisma.cartItem.create({
                data: {
                    userId,
                    productId: Number(itemId),
                    quantity
                }
            });
        }

        res.json({ success: true, message: "Cart updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get user cart
const getUserCart = async (req, res) => {
    try {
        const userId = req.userId;
        const cartItems = await prisma.cartItem.findMany({
            where: { userId },
            include: { product: true }
        });
        res.json({ success: true, cartData: cartItems });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Clear user cart
const clearCart = async (req, res) => {
    try {
        const userId = req.userId;
        await prisma.cartItem.deleteMany({ where: { userId } });
        res.json({ success: true, message: "Cart cleared" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart, clearCart };