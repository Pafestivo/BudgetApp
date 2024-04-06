import API from "./requestUrl";

export const getData = async (endpoint) => {
  const { data } = await API.get(endpoint, {});
  return data;
};

export const postData = async (endpoint, body) => {
  const { data } = await API.post(endpoint, body || {}, {});
  return data;
};

export const putData = async (endpoint, body) => {
  const { data } = await API.put(endpoint, body || {}, {});
  return data;
};

export const deleteData = async (endpoint) => {
  const { data } = await API.delete(endpoint, {});
  return data;
};
