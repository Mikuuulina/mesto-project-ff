const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-38",
  headers: {
    authorization: "1202c0fe-b632-4e71-b016-b1578f359fd6",
    "Content-Type": "application/json",
  },
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject("Ошибка получения данных");
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};
