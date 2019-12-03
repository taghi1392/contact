import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { contactModel } from './contactModel';
import { AlertService } from '../service/alert/alert.service';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class IndexComponent implements OnInit {

  constructor (private alert: AlertService, private apiService: ApiService) {
    this.getData();
  }

  // Varibale
  model = new contactModel();
  contactData = {};
  loadData = [];
  dataSource;
  isNewContact = false;
  mainMode = '';

  source = [
    { id: 1, name: 'ali', lastname: 'alizade', mobile: '09157954797', address: '123', email: 'asada' },
    { id: 2, name: 'mohammad', lastname: 'gholami' }
  ];

  @ViewChildren('mainTable') mainTable: QueryList<any>;

  // testApi
  selectedContact: contactModel = { id: null, username: null, lastname: null, telephone: null, address: null, email: null, place: null };
  //

  columns = ['name', 'lastname'];

  ngOnInit() {

  }

  getData() {
    this.apiService.readContact().subscribe((data: contactModel) => {
      this.loadData = data ? data : [] as any;
      this.dataSource = this.loadData;
    }, (error) => {
      if (error) {
        this.alert.error(error.message);
      }
    });
  }


  saveData() {
    if (!this.model.username) {
      this.alert.error('فیلد نام را پر نمایید');
    } else if (!this.model.lastname) {
      this.alert.error('فیلد نام خانوادگی را پر نمایید');
    } else if (!this.model.telephone) {
      this.alert.error('فیلد شماره تلفن را پر نمایید');
    }
    else {
      this.contactData = {
        id: this.model.id ? this.model.id : null,
        name: this.model.username ? this.model.username : null,
        lastname: this.model.lastname ? this.model.lastname : null,
        mobile: this.model.telephone ? this.model.telephone : null,
        email: this.model.email ? this.model.email : null,
        address: this.model.address ? this.model.address : '',
        place: this.model.place ? this.model.place : null,
      };

      if (this.mainMode == 'edit') {

        this.apiService.updateContact(this.contactData as any).subscribe(res => {
          this.alert.error('بروزرسانی با موفقیت انجام شد');
          this.getData();
          this.clearFrom();
        }, (error) => {
          if (error) {
            this.apiService.handleError(error);
          }
        });

        this.isNewContact = false;

      } else {

        this.apiService.createContact(this.contactData as any).subscribe(res => {
          this.alert.error('ذخیره با موفقیت انجام شد');
          this.getData();
          this.clearFrom();
        }, (error) => {
          this.alert.error(error.message);
        });
      }
    }
  }


  clearFrom() {
    this.model = new contactModel();
    this.mainMode = '';
  }


  newContact(event) {
    this.isNewContact = event;
  }


  cancelNewContact() {
    this.isNewContact = false;
    this.clearFrom();
  }


  deleteContact(event) {
    if (!event) {
      return;
    }
    this.loadData.filter(f => f.id == event.id).forEach(a => {
      this.apiService.deleteContact(Number(a.id));
      this.alert.error('حذف با موفقیت انجام شد');
      this.getData();
    });
  }


  editContact(row) {
    if (!row) {
      return;
    }
    this.isNewContact = true;
    this.mainMode = 'edit';
    this.model.id = Number(row.id);
    this.model.username = row.name ? row.name : null;
    this.model.lastname = row.lastname ? row.lastname : null;
    this.model.telephone = row.mobile ? row.mobile : null;
    this.model.email = row.email ? row.email : null;
    this.model.address = row.address ? row.address : '';
    this.model.place = row.place ? row.place : null;
  }
}
