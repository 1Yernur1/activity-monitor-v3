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
  });
};

export const getProjectById = async (id: number, token: string) => {
  return fetch(`${url}/projects/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  });
};

export const getAllTextItemsByActivity = (id: number, token: string) => {
  return fetch(`${url}/textItems/activity/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  });
};

export const createTranslateForTranslationItem = (
  id: number,
  body: any,
  token: string
) => {
  return fetch(`${url}/textItems/${id}/translationItems`, {
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

export const getTranslationItemHistory = (itemId: number, token: string) => {
  return fetch(`${url}/textItems/${itemId}/translationItems`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  });
};

export const getRemarkHistory = (itemId: number, token: string) => {
  return fetch(`${url}/textItems/${itemId}/latestTranslationItem/remarks`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  });
};

export const createActivityLogDaily = (
  id: number,
  body: any,
  token: string
) => {
  return fetch(`${url}/activities/${id}/log/daily`, {
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


export const createActivityLogWeekly = (
  id: number,
  body: any,
  token: string
) => {
  return fetch(`${url}/activities/${id}/log/weekly`, {
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
