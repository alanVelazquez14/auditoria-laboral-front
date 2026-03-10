import { toast } from "sonner";

export const handleApiError = (error: any, customTitle?: string) => {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    error ||
    "Algo salió mal";
  const status = error?.response?.status;

  if (status === 429 || message.includes("Too Many Requests")) {
    toast.error("Demasiados intentos", {
      description: "Por seguridad, pausamos los intentos. Espera unos minutos.",
      style: {
        border: "1px solid #7c3aed",
        background: "#121217",
        color: "#fff",
      },
    });
  } else {
    toast.error(customTitle || "Error", {
      description: Array.isArray(message) ? message[0] : message,
    });
  }
};
