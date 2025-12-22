import { HttpErrorResponse } from '@angular/common/http';

export function mapApiError(error: HttpErrorResponse): string {
  if (error.error?.message) {
    return error.error.message;
  }

  switch (error.status) {
    case 0:
      return 'No se pudo conectar con el servidor.';
    case 400:
      return 'Solicitud inválida.';
    case 404:
      return 'Recurso no encontrado.';
    case 500:
      return 'Error interno del servidor.';
    default:
      return 'Ocurrió un error inesperado.';
  }
}
