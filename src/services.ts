import axios from "axios";

export const getAuthorized = (url: string) => {
  return axios.get(url, {
    headers: { Authorization: localStorage.getItem("AuthToken") || null },
  });
};

export const postAuthorized = (url: string, data: any) => {
  return axios.post(url, data, {
    headers: { Authorization: localStorage.getItem("AuthToken") || null },
  });
};

export const postAuthorizedUpload = (url: string, data: any) => {
  return axios.post(url, data, {
    headers: {
      Authorization: localStorage.getItem("AuthToken") || null,
      "Content-Type": "multipart/form-data",
    },
  });
};
export const putAuthorizedUpload = (url: string, data: any) => {
  return axios.put(url, data, {
    headers: {
      Authorization: localStorage.getItem("AuthToken") || null,
      "Content-Type": "multipart/form-data",
    },
  });
};
export const putAuthorized = (url: string, data: any) => {
  return axios.put(url, data, {
    headers: {
      Authorization: localStorage.getItem("AuthToken") || null,
    },
  });
};

export const deleteAuthorized = (url: string) => {
  return axios.delete(url, {
    headers: { Authorization: localStorage.getItem("AuthToken") || null },
  });
};
