import { Component } from '@angular/core';
import { DoughnutSettings, Format } from 'projects/spice/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-spice-app';
  doughnutSettings: DoughnutSettings = {
    value: 75,
    thickness: 15,
    size: 150,
    valueFontSize: 20,
    labelText: 'Awesome!',
  };

  doughnutSettings2: DoughnutSettings = {
    value: 3,
    thickness: 10,
    size: 150,
    valueFontSize: 35,
    format: Format.fraction,
    maxValue: 5,
  };

  doughnutSettings3: DoughnutSettings = {
    value: 34,
    thickness: 5,
    size: 150,
    valueFontSize: 35,
  };
}
