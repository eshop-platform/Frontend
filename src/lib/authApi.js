import { buildApiUrl } from "../../shared/apiConfig";

export const postAuthJson = async (path, payload) => {
  const response = await fetch(buildApiUrl(`/api/auth${path}`), {
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
