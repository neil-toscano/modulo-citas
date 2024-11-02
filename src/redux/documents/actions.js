// app/actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
const url = import.meta.env.VITE_PUBLIC_URL;

export const getAllDocumentsSection = createAsyncThunk(
  "documents/getAllDocumentsSection",
  async ({ token }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${url}/section-type-document`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`, // No es necesario JSON.parse si el token es una cadena.
      },
    });

    const data = await response.json();
    console.log(data, "viendo data docuemnt");

    return data;
  }
);
