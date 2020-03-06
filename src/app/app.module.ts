import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './views/ui/ui.module';

import { AngularFireModule} from 'angularfire2';
import { firebaseConfig } from './../environments/firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './service/auth/auth.service';
import { AuthGuards } from './guards/auth.guards';
import { AngularFireDatabase } from 'angularfire2/database';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DashboardsComponent } from './views/dashboards/dashboards.component';
import { RoomsComponent } from './views/rooms/rooms.component';
import { LoginComponent } from './views/login/login.component';
import { ManageBuildModule } from './views/manage-build/manage-build.module';
import { ManageDeviceModule } from './views/manage-device/manage-device.module';
import { LvStandComponent } from './views/lv-stand/lv-stand.component';
import { ManagerComponent } from './views/manager/manager.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardsComponent,
    RoomsComponent,
    LoginComponent,
    LvStandComponent,
    ManagerComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    UiModule,
    Ng2SmartTableModule, 
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ManageBuildModule,
    ManageDeviceModule,
    LeafletModule.forRoot(),
    AppRoutingModule
  ],
  providers: [AuthService, AngularFireDatabase, AuthGuards, {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
