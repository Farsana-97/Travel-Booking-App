import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice'
import desinationReducer from '../features/destinationSlice'
import packageReducer from '../features/packageSlice'
import bookingReducer from '../features/bookingSlice'
import paymentReducer from '../features/paymentSlice'
import contactReducer from '../features/contactSlice'

const store = configureStore({
    reducer:{
        auth:authReducer,
        destination:desinationReducer,
        package:packageReducer,
        booking:bookingReducer,
        payment:paymentReducer,
        contact:contactReducer,
        
    }
})

export default store