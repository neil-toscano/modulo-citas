import axios from "axios";

async function tokenLoginUser(token) {
  const url = `${import.meta.env.VITE_PUBLIC_URL}/auth/check-status`;

  try {
    const response = await axios.get(url, {
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    console.log(response.data, "token");
    return response.data;
  } catch (error) {
    console.error("Error checking token status:", error);
    throw error; // Maneja el error según sea necesario
  }
}

export default tokenLoginUser;
