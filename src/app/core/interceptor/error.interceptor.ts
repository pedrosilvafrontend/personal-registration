import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


const getMessage = (error: HttpErrorResponse) => {
  return error.error?.error || error.error || error.message || `${error.status} ${error.statusText}`
};

const getHandleError = (router: Router, snack: MatSnackBar) => {
  return (error: HttpErrorResponse): Observable<never> => {
    const err = () => throwError(() => error);
    const message = getMessage(error);
    if (!message) {
      snack.open("Erro interno do servidor.");
    }
    logError(error);
    snack.open(getMessage(error), 'ok', { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' });
    return err();
  }
}

const logError = (error: HttpErrorResponse): void => {
  console.error('ERROR', error);
}

export const errorInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<any>> => {
  const snack = inject(MatSnackBar);
  const router = inject(Router);
  const handleError = getHandleError(router, snack);

  return next(req).pipe(
    catchError(
      (error: HttpErrorResponse) => handleError(error)
    )
  );
}
