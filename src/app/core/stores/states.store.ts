import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { StatesService } from '@core/services/states.service';
import { State } from '@core/models/state.interface';
import { catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StatesStore {
  private statesSig = signal<State[]>([]);
  private loadingSig = signal<boolean>(false);
  private errorSig = signal<string | null>(null);

  private service = inject(StatesService);

  states: Signal<State[]> = computed(() => this.statesSig());
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
          this.errorSig.set('Falha ao carregar estados');
          console.error('States load error', err);
          return of<State[]>([]);
        })
      )
      .subscribe((list) => {
        this.statesSig.set(list ?? []);
        this.loadingSig.set(false);
      });
  }
}
