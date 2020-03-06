import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Builds } from './rooms.model';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  buildList: AngularFireList<any>;
  selectedDashborad: Builds = new Builds();

  constructor(
    private firebase :AngularFireDatabase
  ) { }

  getData(){
    this.buildList = this.firebase.list('System/Building/');
    return this.buildList;
  }
}
