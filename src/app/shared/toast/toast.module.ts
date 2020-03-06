import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        ToastComponent
    ],
    entryComponents: [
        ToastComponent
    ],
    imports: [
        CommonModule,
        MatSnackBarModule,
        MatButtonModule,
        MatIconModule
    ],
    providers: [
        ToastService
    ]
})
export class ToastModule { }
