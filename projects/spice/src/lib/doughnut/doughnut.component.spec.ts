// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { DoughnutComponent } from './doughnut.component';

// describe('DoughnutComponent', () => {
//   let component: DoughnutComponent;
//   let fixture: ComponentFixture<DoughnutComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ DoughnutComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(DoughnutComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { render, screen } from '@testing-library/angular';
import { DoughnutComponent } from './doughnut.component';

describe('AppComponent', () => {
  it('should render Welcome', async () => {
    await render(DoughnutComponent);
    await screen.getByText('doughnut works! god dammit');
  });
});
