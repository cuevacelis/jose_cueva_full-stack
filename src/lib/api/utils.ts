import axios from "axios";
import { ErrorQuery } from "../custom-error/error-query";

export const getAuthToken = () => {
  const token = localStorage.getItem("spotify_access_token");
  return `Bearer ${token}`;
};

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      throw new ErrorQuery({
        message:
          (error.response?.data as { mensaje?: string })?.mensaje ??
          error.message ??
          "Error en la respuesta del servidor",
        statusCode: error.response?.status,
        error: error,
      });
    }

    if (error.request) {
      throw new ErrorQuery({
        message: "No se recibió respuesta del servidor",
        statusCode: 0,
      });
    }

    if (error.code === "ERR_CANCELED") {
      // console.info("Request was canceled", error.message);
      return;
    }

    throw new ErrorQuery({
      message: error?.message ?? "Error al configurar la solicitud",
    });
  }

  throw new ErrorQuery({
    message:
      error instanceof Error ? error?.message : "Error desconocido en la API",
    statusCode: 500,
    error: error,
  });
};
