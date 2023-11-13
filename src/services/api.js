import axios from "axios";

const API = axios.create({
  baseURL: "http://wp-api.test:8080/wp-json",
});

export default API;
