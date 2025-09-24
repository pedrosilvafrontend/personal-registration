import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '@core/services/data.service';
import { DataInfo } from '@core/models/data-info.interface';
import { Subject, takeUntil } from 'rxjs';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DialogService } from '@core/services/dialog.service';

@Component({
  selector: 'app-list',
  imports: [
    MatTableModule,
    MatIconModule,
    MatIconButton,
    RouterLink,
    MatButton
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List implements OnInit, OnDestroy {
  private dataService = inject(DataService);
  readonly dialogService = inject(DialogService);
  displayedColumns: string[] = ['fullName', 'cpf', 'phone', 'company', 'actions'];
  dataSource: DataInfo[] = [];
  destroySubject = new Subject<void>();

  delete(data: DataInfo) {
    this.dialogService.confirm({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this item?'
    }).pipe(takeUntil(this.destroySubject)).subscribe(
      (result: boolean | string) => {
        if (result && result !== 'false' && data.id) {
          this.dataService.delete(data.id).pipe(takeUntil(this.destroySubject)).subscribe(() => {
            this.dataSource = this.dataSource.filter(item => item.id !== data.id);
          });
        }
      }
    )
  }

  ngOnInit() {
    this.dataService.getData().pipe(takeUntil(this.destroySubject)).subscribe(data => {
      this.dataSource = data;
    });
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
