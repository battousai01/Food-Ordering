import React, { useState, useEffect, useContext } from "react";
//import { FoodContext } from "../../context/Foodcontext";
import axios from "axios";
import { backendUrl,currency} from "../../App";
import { toast } from "react-toastify";
import "./Orders.css";

const Orders = ({ token }) => {

  const [orders,setOrders] = useState([]);
  const fetchAllorders = async () => {
        if(!token) {
            return null;
        }
        try{
          const response = await axios.post(`${backendUrl}/api/orders/list`,
            {}, 
            {headers: {token}}
          );
          //console.log(response);
          if(response.data){
            setOrders(response.data.orders);
          }else{
            toast.error(response.data.message);
          }
        }catch(error){
          console.log(error)
          toast.error(error.message);
        }

  }

  const statusHandler = async (event, orderId) => {
    try{
      const response = await axios.post (`${backendUrl}/api/orders/status`,
        {orderId,status: event.target.value},{headers: {token}})
        if(response.data.success){
          await fetchAllorders()
        }
    }catch(error){
       console.log(error)
       toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchAllorders();
  }, [token]);
  return(
    <div>
      <h2 className="order-title">All Orders</h2>
      <div className="order-container">
        <table className="order-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Telephone</th>
              <th>Shipping Address</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Items</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Paymment Status</th>
              <th>Date</th>
              <th>Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map((order,index) => (
                <tr key={index}>  
                  <td>{order.address.firstName}</td>
                  <td>{order.address.email}</td>
                  <td>{order.address.phone}</td>
                  <td>{order.address.street},{order.address.city},{order.address.state},
                      {order.address.country},{order.address.zipcode}
                  </td>
                  <td>{
                    order.items.map((item, i) => (
                      <p key={i}>{item.name}</p>
                    ))
                  }</td>
                  <td>{
                    order.items.map((item,i) =>(
                      <p key={i}>{item.quantity}</p>
                    ))
                  }</td>
                  <td>{order.items.length}</td>
                  <td>{currency}{order.amount}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.payment ? "Done":"Pending"}</td>
                  <td>{new Date(order.date).toLocaleString()}</td>
                  <td>
                    <select onChange={(event)=> statusHandler(event,order.id)} value={order.status} className="order-status">
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Orders;