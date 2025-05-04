import React, { createContext,useEffect,useState } from "react";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import {product} from "../assets/assets";

export const FoodContext = createContext();

const FoodContextProvider = ({ children }) => {


    const deliverly_fee = 12;
    const currency = '$'

    const [products, setProducts] = useState(product);
    const [cartItems, setCartItems] = useState({}); 
    const navigate = useNavigate();

    const addToCart = async (itemId) => {
        const updateCart = {...cartItems};
        updateCart[itemId] = (updateCart[itemId] || 0) + 1;
        setCartItems(updateCart);

        console.log(`${itemId} added to cart`);

        toast.success('Add to cart');
    }    


    const getCartCount = () => {
        return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
    }

    const updateQuantity = async(itemId, quantity) => {
        let carDate = {...cartItems};
        carDate[itemId] = quantity;
        setCartItems(carDate);  

    }    

    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((totalAmount, [itemId, quantity]) => {
            const itemInfo = products.find(( product) => product._id === itemId);
            return itemInfo ? totalAmount + itemInfo.price * quantity : totalAmount;
        },0)
    }    
    return (
        <FoodContext.Provider value={{products,cartItems,navigate,currency,getCartAmount,addToCart,deliverly_fee,getCartCount,updateQuantity}}>
            {children}
        </FoodContext.Provider>
    )   

}

export default FoodContextProvider;