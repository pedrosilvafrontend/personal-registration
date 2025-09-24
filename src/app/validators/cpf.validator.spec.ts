import { FormControl } from '@angular/forms';
import { CpfValidator } from './cpf.validator';

describe('CpfValidator', () => {
  it('should return null for empty value', () => {
    const control = new FormControl('');
    expect(CpfValidator.isValid(control)).toBeNull();
  });

  it('should invalidate < 11 numbers', () => {
    const control = new FormControl('12345');
    expect(CpfValidator.isValid(control)).toEqual({ cpfInvalid: true });
  });

  it('should invalidate invalid CPF', () => {
    let control = new FormControl('123.456.789-00');
    expect(CpfValidator.isValid(control)).toEqual({ cpfInvalid: true });
    control = new FormControl('123.456.789-90');
    expect(CpfValidator.isValid(control)).toEqual({ cpfInvalid: true });
  });

  it('should invalidate repeated digits', () => {
    const control = new FormControl('111.111.111-11');
    expect(CpfValidator.isValid(control)).toEqual({ cpfInvalid: true });
  });

  it('should validate a correct CPF', () => {
    const control = new FormControl('529.982.247-25');
    expect(CpfValidator.isValid(control)).toBeNull();
  });
});
