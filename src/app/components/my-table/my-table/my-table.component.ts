import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { MatTableDataSource } from '@angular/material';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MyTableComponent implements OnInit {

  constructor () { }

  selectedRow;
  expandedElement: PeriodicElement | null;
  dataSource;

  // tslint:disable-next-line: no-input-rename
  @Input()
  data: any;


  // tslint:disable-next-line: no-input-rename
  @Input('columns')
  columnsToDisplay: [];

  @Input()
  PeriodicElement: {};

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onAddRow = new EventEmitter();

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onDeleteRow = new EventEmitter();

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onEditRow = new EventEmitter();
  // tslint:disable-next-line: use-lifecycle-interface

  ngOnInit() {
    this.getData();
  }

  getData() {

    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.data) ? new MatTableDataSource(this.data) : [];
    }, 100);
  }

  public traslate(event: string) {

    let persianName;
    if (!event || event == '') {
      return;
    }

    if (event == 'name') {
      persianName = 'نام';
    }
    if (event == 'lastname') {
      persianName = 'نام خانوادگی';
    }

    return persianName;
  }

  addRow() {
    this.onAddRow.emit('true');


  }

  DeleteRow(event) {
    this.onDeleteRow.emit(event);
    this.getData();
  }

  EditRow(event) {
    this.onEditRow.emit(event);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  log(selectedRow) {
    console.log(selectedRow);
  }

}

// tslint:disable-next-line: no-empty-interface
export interface PeriodicElement {


}
