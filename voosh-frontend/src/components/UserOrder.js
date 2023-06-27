import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";

export default function UserOrder() {
    // const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const {userid} = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // const userId = new URLSearchParams(window.location.search).get("userid");
        
        const token = axios.defaults.headers.common["Authorization"];
        console.log(userid);

        const response = await axios.get(
          `${config.serverURL}/api/get-order?userid=${userid}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setOrders(response.data.message);
      } catch (err) {
        setError(err.response.data.error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>User Order Details</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              Order ID: {order._id}, Total Amount: {order.subTotal}, Phone Number: {order.phoneNum}
              , createdAt: {order.createdAt}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
