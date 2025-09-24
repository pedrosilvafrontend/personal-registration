import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { Profession } from '@core/models';
import { ProfessionsService } from '@core/services/professions.service';
import { catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfessionsStore {
  private professionsSig = signal<Profession[]>([]);
  private loadingSig = signal<boolean>(false);
  private errorSig = signal<string | null>(null);

  private service = inject(ProfessionsService);

  professions: Signal<Profession[]> = computed(() => this.professionsSig());
  loading: Signal<boolean> = computed(() => this.loadingSig());
  error: Signal<string | null> = computed(() => this.errorSig());

  loadAll(): void {
    if (this.loadingSig()) return;
    this.loadingSig.set(true);
    this.errorSig.set(null);
    this.service
      .getAll()
      .pipe(
        catchError((err) => {
          this.errorSig.set('Falha ao carregar profissões');
          console.error('Professions load error', err);
          return of<Profession[]>([]);
        })
      )
      .subscribe((list) => {
        this.professionsSig.set(list ?? []);
        this.loadingSig.set(false);
      });
  }
}
