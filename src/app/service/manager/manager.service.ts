import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Build, Rooms , Device } from './manager.model';

import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  buildList: AngularFireList<any>;
  roomList: AngularFireList<any>;
  dataDeviceList: AngularFireList<any>;

  selectedRooms: Rooms = new Rooms();
  selectedBuild: Build = new Build();

  constructor( private firebase: AngularFireDatabase) { }

  getDataBuild(){
    this.buildList = this.firebase.list('System/Building/');
    return this.buildList;
  }

  getDataRoom(){
    this.roomList = this.firebase.list('System/Rooms/');
    return this.roomList;
  }

  getDataDevice(){
    this.dataDeviceList = this.firebase.list('System/Sensor/');
    // console.log(this.stationListLocat)
    return this.dataDeviceList; 
  }

  insertBuild(build : Build){
    firebase.database().ref('System/Building/'+build.Build_name).set({
      latitude : build.latitude,
      longitude : build.longitude,
      Detail: build.Detail,
      Build_name: build.Build_name,
    })
  }
  updateBuild(build: Build){
    this.buildList.update(build.$key,
      {
        latitude : build.latitude,
        longitude : build.longitude,
        Detail: build.Detail,
        Build_name: build.Build_name,
      })
  }

  insertDevice(room : Rooms){
    firebase.database().ref('System/Rooms/'+room.Room_number).set({
      Room_number: room.Room_number,
      Address: room.Address,
      Build_name: room.Build_name,
    })
    firebase.database().ref('System/Building/'+room.Build_name+'/Rooms/'+room.Room_number).set({
      Room_number: room.Room_number,
      Address: room.Address,
    })
  }
  updateDevice(room: Rooms){
    this.roomList.update(room.$key,
      {
        Room_number: room.Room_number,
        Address: room.Address,
        Build_name: room.Build_name,
      })
  }
  
  deleteDevice(build: string, room: string){
    this.roomList.remove(room);
    var adaRef = firebase.database().ref('System/Building/'+build+'/Rooms/'+room)
    adaRef.remove()
    .then(function() {
      console.log("Remove "+build+"/Rooms/"+room+" succeeded.")
    })
    .catch(function(error) {
      console.log("Remove failed: " + error.message)
    });

  }

  deleteDevicedata(key: string){
    this.dataDeviceList.remove(key);
  }

}
