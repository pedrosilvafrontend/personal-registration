import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective } from 'ngx-mask';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CpfValidator } from '@validators';
import { MatIcon } from '@angular/material/icon';
import { AddressService } from '@core/services/address.service';
import { firstValueFrom, Subject, take, takeUntil } from 'rxjs';
import { Profession, ResidentialInfo } from '@core/models';
import { DataService } from '@core/services/data.service';
import { DataInfo } from '@core/models/data-info.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionsService } from '@core/services/professions.service';
import { MatSelectModule } from '@angular/material/select';
import { StatesService } from '@core/services/states.service';
import { State } from '@core/models/state.interface';

@Component({
  selector: 'app-record',
  templateUrl: './record.html',
  styleUrl: './record.css',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMaskDirective,
    MatSelectModule,
    MatIcon,
  ],
})
export class Record implements OnInit, OnDestroy {
  private _fb = inject(FormBuilder);
  private addressService = inject(AddressService);
  private dataService = inject(DataService);
  private professionsService = inject(ProfessionsService);
  private statesService = inject(StatesService);
  private destroySubject = new Subject<void>();
  private snack = inject(MatSnackBar);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  public id: string | null = null;
  public professions: Profession[] = [];
  public states: State[] = [];

  personalForm = this._fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    birthDate: ['', Validators.required],
    cpf: ['', [Validators.required, CpfValidator.isValid]],
    phone: ['', [Validators.required]],
  });

  residentialForm = this._fb.group({
    address: ['', [Validators.required]],
    neighborhood: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
  });

  professionalForm = this._fb.group({
    profession: ['', [Validators.required]],
    company: ['', [Validators.required]],
    salary: [null as number | null, [Validators.required, Validators.min(0)]],
  });

  submit(): void {
    if (this.personalForm.invalid || this.residentialForm.invalid || this.professionalForm.invalid) {
      this.personalForm.markAllAsTouched();
      this.residentialForm.markAllAsTouched();
      this.professionalForm.markAllAsTouched();
      return;
    }
    const data = {
      id: this.id,
      personal: this.personalForm.value,
      residential: this.residentialForm.value,
      professional: this.professionalForm.value,
    } as unknown as DataInfo;

    const request$ = this.id ? this.dataService.update(data) : this.dataService.create(data);
    const message = this.id ? 'Atualizado com sucesso!' : 'Cadastrado com sucesso!';
    request$.pipe(takeUntil(this.destroySubject)).subscribe(response => {
      this.snack.open(
        message, 'ok',
        { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' }
      );
      this.router.navigate(['/list']).then();
    })
  }

  formObservables() {
    this.residentialForm.controls.postalCode.valueChanges.pipe(takeUntil(this.destroySubject)).subscribe(cep => {
      if (!cep?.trim()) return;
      if (cep?.trim().length !== 8) return;
      this.addressService.getByCep(cep)
        .pipe(take(1))
        .subscribe((address: Partial<ResidentialInfo>) => {
          delete address.postalCode;
          this.residentialForm.patchValue(address, { emitEvent: false });
        })
    });
  }

  async ngOnInit() {
    this.professions = await firstValueFrom(this.professionsService.getAll());
    this.states = await firstValueFrom(this.statesService.getAll());

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.dataService.getById(this.id).pipe(takeUntil(this.destroySubject)).subscribe(data => {
        this.personalForm.patchValue(data.personal);
        this.residentialForm.patchValue(data.residential);
        this.professionalForm.patchValue(data.professional);
        this.formObservables();
      });
    }
    else {
      this.formObservables();
    }
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
