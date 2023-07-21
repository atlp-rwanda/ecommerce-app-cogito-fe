import { createAsyncThunk } from "@reduxjs/toolkit";
import URL from "../../../utils/api";

export const getOrderStatus = createAsyncThunk(
    'order/details',
    async (order_id:any, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await URL.get(`/order/getStatus/${order_id}`, config);
        
        // Check if the response contains 'data' property
        if (!response.data) {
          return rejectWithValue("Error: Data not found in the response");
        }
  
        return response.data;
      } catch (error:any) {
        // Handle the error properly
        console.log(error)
        return rejectWithValue(error.message || "Something went wrong");
      }
    }
  );
  