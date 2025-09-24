import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface ConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm',
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './confirm.html',
  styleUrl: './confirm.scss'
})
export class Confirm {
  public data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
}
