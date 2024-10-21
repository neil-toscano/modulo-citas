async function tokenLoginUser(token) {
  const url =
    `${import.meta.env.VITE_PUBLIC_URL}/auth/check-status`;
  const userToken = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
  return userToken;
}

export default tokenLoginUser;
