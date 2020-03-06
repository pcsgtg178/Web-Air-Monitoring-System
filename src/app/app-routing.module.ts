import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardsComponent } from './views/dashboards/dashboards.component';
import { RoomsComponent } from './views/rooms/rooms.component';
import { LoginComponent } from './views/login/login.component'; 
import { ManageBuildComponent } from './views/manage-build/manage-build.component';
import { ManageDeviceComponent } from './views/manage-device/manage-device.component';
import { ManagerComponent } from './views/manager/manager.component';
import { LvStandComponent } from './views/lv-stand/lv-stand.component';
import { AuthGuards } from './guards/auth.guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rooms',
    pathMatch: 'full'
  },
  {
    path: 'dashboards/:roomNumber',
    component: DashboardsComponent
  },
  {
    path: 'rooms',
    component: RoomsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate: [AuthGuards],
  },
  {
    path: 'manage/build',
    component: ManageBuildComponent,
    canActivate: [AuthGuards],
  },
  {
    path: 'manage/device',
    component: ManageDeviceComponent,
    canActivate: [AuthGuards],
  },
  {
    path: 'manage/stands',
    component: LvStandComponent,
    canActivate: [AuthGuards],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
