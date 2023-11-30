import {URL} from "@/app/config/constants";

export const getAllProjects = async (token: string) => {
  return fetch(`${URL}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  });
};

export const getAllActivitiesByProjectId = async (
  projectId: number,
  token: string
) => {
  return fetch(`${URL}/activities/project/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  });
};

export const changeActivityStatusAsManger = async (
  id: number,
  status: string,
  token: string
) => {
  return fetch(`${URL}/activities/${id}/updateByManager/status`, {
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

export const getAllTranslators = async (token: string) => {
  return fetch(`${URL}/users/translators`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  });
};

export const getAllManagers = async (token: string) => {
  return fetch(`${URL}/users/projectManagers`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  });
};

export const getAllFreeChiefEditors = async (token: string) => {
  return fetch(`${URL}/users/chiefEditors/free`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  });
};

export const getActivityById = async (id: number, token: string) => {
  return fetch(`${URL}/activities/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  });
};

export const changeActivityAsManager = async (
  id: number,
  body: any,
  token: string
) => {
  return fetch(`${URL}/activities/${id}/updateByManager`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const createActivity = async (body: any, token: string) => {
  return fetch(`${URL}/activities`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const createProject = async (body: any, token: string) => {
  return fetch(`${URL}/projects`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  });
};

export const editProject = async (id: number, body: any, token: string) => {
  return fetch(`${URL}/projects/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  });
};

export const getProjectById = (id: string, token: string) => {
  return fetch(`${URL}/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  });
};

export const addActivityDocument = (id: number, token: string, body: any) => {
  return fetch(`${URL}/activities/${id}/docx`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: body,
  }).then((response) => {
    if (response.status === 200) return response.json();
    else throw new Error();
  });
};
