async function tokenLoginUser(token) {
  const url = `${import.meta.env.VITE_PUBLIC_URL}/auth/check-status`;
  const userToken = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
  const jsonToken = userToken.json();

  return jsonToken;
}

export default tokenLoginUser;
