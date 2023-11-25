export const singInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const url = "https://identitytoolkit.googleapis.com/v1";
  const key = "AIzaSyAfyekMkH4IsK9q4LQvar5tEKb3SNujPZA";
  const body = {
    email,
    password,
    returnSecureToken: true,
  };
  return await fetch(`${url}/accounts:signInWithPassword?key=${key}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
