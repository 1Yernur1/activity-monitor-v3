export const getAllTranslatorActivities = async (id: string, token: string) => {
  const url = "https://activity-monitoring-m950.onrender.com";
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
