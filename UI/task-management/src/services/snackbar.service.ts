import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  public showSuccess(message: string, duration: number = 3000): void {
    const config: MatSnackBarConfig = {
      duration,
      panelClass: ['snackbar-success'],
      verticalPosition: "top",
      horizontalPosition: "right"
    };
    this.snackBar.open(message, '', config); 
  }

  public showError(message: string): void {
    const config: MatSnackBarConfig = {
      panelClass: ['snackbar-error'],
      verticalPosition: "top",
      horizontalPosition: "center"
    };
    this.snackBar.open(message, 'Close', config); 
  }
}
