import { Injectable } from '@angular/core';
import { ToastComponent } from './toast.component';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ToastService {

    config: MatSnackBarConfig = {
        panelClass: 'success-toast',
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
    };

    private defaultDuration = 3000;

    constructor(public snackBar: MatSnackBar) { }

    public showSuccessToast(message: string, duration?: number): void {
        this.config.duration = duration || this.defaultDuration;
        this.config.panelClass = 'success-toast';
        this.openToast(message);
    }

    public showWarningToast(message: string, duration?: number): void {
        this.config.duration = duration || this.defaultDuration;
        this.config.panelClass = 'warning-toast';
        this.openToast(message);
    }

    private openToast(message: string): void {
        this.snackBar.openFromComponent(ToastComponent, {
            data: message,
            ...this.config,
        });
    }
}


