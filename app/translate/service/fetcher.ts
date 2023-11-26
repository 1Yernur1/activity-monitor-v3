const url = "https://activity-monitoring-m950.onrender.com";

export const getAllTranslatorActivities = async (id: string, token: string) => {
  return await fetch(`${url}/activities/translator/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  });
};

export const changeActivityStatusAsTranslator = async (
  id: number,
  status: string,
  token: string
) => {
  return fetch(`${url}/activities/${id}/updateByTranslator/status`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: status }),
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  })
};
