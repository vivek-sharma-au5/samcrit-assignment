import Axios from "axios";

Axios.interceptors.request.use(async (config) => {
  return config;
});

export const EmpHTTP = Axios;
