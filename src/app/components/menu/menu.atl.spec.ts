import { render, screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { Menu } from './menu';

describe('Menu (ATL)', () => {
  it('should render action buttons', async () => {
    await render(Menu, { providers: [provideRouter([])] });
    expect(screen.getByText(/Listagem/i)).toBeTruthy();
    expect(screen.getByText(/Cadastrar/i)).toBeTruthy();
  });
});
