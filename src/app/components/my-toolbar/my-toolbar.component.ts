import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'my-toolbar',
  templateUrl: './my-toolbar.component.html',
  styleUrls: ['./my-toolbar.component.scss']
})
export class MyToolbarComponent implements OnInit {

  constructor() { }

  @Input()
  label;

  ngOnInit() {
  }

}
