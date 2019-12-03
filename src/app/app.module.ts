import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { IndexComponent } from './index/index.component';
import { FormsModule } from '@angular/forms';
import { ListContactComponent } from './list-contact/list-contact/list-contact.component';
import { AlertService } from './service/alert/alert.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './service/api/api.service';
import { MyToolbarComponent } from './components/my-toolbar/my-toolbar.component';
import { MyButtonComponent } from './components/my-button/my-button.component';
import { MyTableComponent } from './components/my-table/my-table/my-table.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ListContactComponent,
    MyToolbarComponent,
    MyButtonComponent,
    MyTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CoreModule,
    HttpClientModule,
    SharedModule.forRoot()
  ],
  providers: [AlertService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
