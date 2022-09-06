import { configureStore } from "@reduxjs/toolkit";
import mailreducer from "./mailreducer";
import authreducer from "./authreducer";

const store = configureStore({
        reducer : {
            auth:authreducer,
            mail:mailreducer
        }}
)

export default store;