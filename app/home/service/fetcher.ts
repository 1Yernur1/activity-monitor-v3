const url = "https://activity-monitoring-m950.onrender.com";

export const getAllProjects = async (token: string) => {
  return fetch(`${url}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  });
};
