import { Component } from '@angular/core';
import { DoughnutSettings } from 'projects/spice/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-spice-app';
  doughnutSettings: DoughnutSettings = {
    value: 75,
    thickness: 25,
    size: 300 
  }
}
