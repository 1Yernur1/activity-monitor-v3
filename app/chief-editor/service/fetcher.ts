const url = "https://activity-monitoring-m950.onrender.com";

export const getAllReviewsAsChief = (chiefEditorId: string, token: string) => {
  return fetch(`${url}/reviews/chiefEditor/${chiefEditorId}`, {
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

export const createRemarkForTranslationItem = (
  textItemId: number,
  body: any,
  token: string
) => {
  return fetch(`${url}/textItems/${textItemId}/latestTranslationItem/remarks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  });
};

export const getAllTranslationRemarks = (textItemId: number, token: string) => {
  return fetch(`${url}/textItems/${textItemId}/latestTranslationItem/remarks`, {
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

export const changeReviewStatus = (
  reviewId: number,
  body: any,
  token: string
) => {
  return fetch(`${url}/reviews/${reviewId}/update/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error();
  });
};
