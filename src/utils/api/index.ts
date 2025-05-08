import axios from "axios";

const BaseUri=import.meta.env.VITE_BASE_URL ;

export const apiClient = axios.create({
    baseURL: BaseUri,
    headers: {
      "Content-Type": "application/json",
    },
  });
  