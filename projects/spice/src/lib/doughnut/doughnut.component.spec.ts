import { render, screen } from '@testing-library/angular';
import { DoughnutComponent } from './doughnut.component';

describe('AppComponent', () => {
  it('should render Welcome', async () => {
    await render(DoughnutComponent);
    // await screen.getByText('doughnut works! god dammit');
  });
});
