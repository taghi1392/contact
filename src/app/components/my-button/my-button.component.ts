import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.scss']
})
export class MyButtonComponent implements OnInit {

  constructor() { }

  // tslint:disable-next-line: no-output-native
  @Output()
  public click: EventEmitter<any> = new EventEmitter();

  @Input()
  label;

  @Input()
  icon;

  @Input()
  styles: {};

  ngOnInit() {
  }

}
