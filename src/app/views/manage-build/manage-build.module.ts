import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ManageBuildComponent } from './manage-build.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from '../../../environments/firebase.config';
import { AddBuildingComponent } from './add-building/add-building.component';
import { ListBuildingComponent } from './list-building/list-building.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material'
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    ManageBuildComponent,
    AddBuildingComponent,
    ListBuildingComponent,
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
export class ManageBuildModule { }
