import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Confirm, ConfirmDialogData } from '../../components/confirm/confirm';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialog = inject(MatDialog);

  confirm(data: ConfirmDialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(Confirm, {
      width: '400px',
      data: data
    });

    return dialogRef.afterClosed();
  }
}
