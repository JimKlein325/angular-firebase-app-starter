import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import{firebaseConfig} from '../environments/firebase.config'
import { AngularFireModule } from 'angularfire2/index';
import { AngularFireDatabaseModule } from "angularfire2/database";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { MasterDetailComponent } from './master-detail/master-detail.component';
import { CoursesService } from 'app/courses.service';

@NgModule({
  declarations: [
    AppComponent,
    MasterDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    HttpModule
  ],
  providers: [CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
