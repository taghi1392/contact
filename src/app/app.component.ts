import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'contact_DB';

  source = [
    { id: 1, name: 'ali', lastname: 'alizade', mobile: '09157954797', address: '123', email: 'asada' },
    { id: 2, name: 'mohammad', lastname: 'gholami' }
  ];

  list = [
    'name', 'lastname'
  ];

}
