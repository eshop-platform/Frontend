const AUTH_API_BASE_URL = "http://localhost:5000/api/auth";

export const postAuthJson = async (path, payload) => {
  const response = await fetch(`${AUTH_API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};
