// app/actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import messageRedux from "./message";
const url = process.env.NEXT_PUBLIC_URL;

export const getAllDocumentsSection = createAsyncThunk(
  "documents/getAllDocumentsSection",
  async ({ token }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${url}/section-type-document`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`, // No es necesario JSON.parse si el token es una cadena.
      },
    });

    const data = await response.json();
    
    return data;
  }
);

