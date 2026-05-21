import { toast } from "sonner";
import { ApiClientError } from "@/lib/api-client";

export const handleApiError = (error: unknown, customTitle?: string) => {
  const status =
    error instanceof ApiClientError
      ? error.status
      : (error as { response?: { status?: number } })?.response?.status;

  const message =
    (error as { details?: { message?: string | string[] } })?.details?.message ||
    (error as { response?: { data?: { message?: string | string[] } } })?.response
      ?.data?.message ||
    (error as { message?: string })?.message ||
    String(error || "Algo salió mal");

  if (
    status === 429 ||
    (typeof message === "string" && message.includes("Too Many Requests"))
  ) {
    toast.error("Demasiados intentos", {
      description: "Por seguridad, pausamos los intentos. Espera unos minutos.",
      style: {
        border: "1px solid #7c3aed",
        background: "#121217",
        color: "#fff",
      },
    });
    return;
  }

  if (status === 401) {
    toast.error(customTitle || "Sesión expirada", {
      description:
        "Tu sesión no es válida o expiró. Inicia sesión nuevamente.",
    });
    return;
  }

  if (status === 403) {
    toast.error(customTitle || "Acceso denegado", {
      description:
        "No tienes permisos para acceder o modificar este recurso.",
    });
    return;
  }

  toast.error(customTitle || "Error", {
    description: Array.isArray(message) ? message[0] : message,
  });
};
