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

export const getAllActivitiesByProjectId = async (projectId: number, token: string) => {
  return fetch(`${url}/activities/project/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  });
};

export const changeActivityStatusAsManger= async (
  id: number,
  status: string,
  token: string
) => {
  return fetch(`${url}/activities/${id}/updateByManager/status`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: status }),
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  });
};