// app/actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import messageRedux from "./message";
const url = process.env.NEXT_PUBLIC_URL;

export const fetchClientData = createAsyncThunk(
  "plataformista/fetchClientData",
  async (dataClient) => {
    messageRedux.initialMessageLogin();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(`${url}/auth/login`, {
      method: "POST",
      body: JSON.stringify(dataClient),
      headers: myHeaders,
    });
    const data = await response.json();
    messageRedux.messageLogin(data);
    return data;
  }
);
