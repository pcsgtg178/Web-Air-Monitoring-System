import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AddDeviceComponent } from './add-device/add-device.component';
import { ListDeviceComponent } from './list-device/list-device.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from '../../../environments/firebase.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material'
import { MatTableModule } from '@angular/material/table';
import { ManageDeviceComponent } from './manage-device.component';

@NgModule({
  declarations: [
    ManageDeviceComponent,
    AddDeviceComponent,
    ListDeviceComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [AngularFireDatabase]
})
export class ManageDeviceModule { }
