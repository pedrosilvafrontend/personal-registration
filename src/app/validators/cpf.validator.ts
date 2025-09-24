import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CpfValidator {
  static isValid(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value;

    if (!cpf) {
      return null;
    }

    const cleanedCpf = cpf.replace(/[^\d]+/g, '');

    if (cleanedCpf.length !== 11) {
      return { cpfInvalid: true };
    }

    if (/^(\d)\1{10}$/.test(cleanedCpf)) {
      return { cpfInvalid: true };
    }

    let sum = 0;
    let remainder: number;

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cleanedCpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) {
      remainder = 0;
    }
    if (remainder !== parseInt(cleanedCpf.substring(9, 10))) {
      return { cpfInvalid: true };
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cleanedCpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) {
      remainder = 0;
    }
    if (remainder !== parseInt(cleanedCpf.substring(10, 11))) {
      return { cpfInvalid: true };
    }

    return null;
  }
}
