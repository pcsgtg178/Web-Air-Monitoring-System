import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../../service/manager/manager.service';
import { Build, Rooms, Device } from '../../../service/manager/manager.model';
@Component({
  selector: 'list-building',
  templateUrl: './list-building.component.html',
  styleUrls: ['./list-building.component.css']
})
export class ListBuildingComponent implements OnInit {

  buildList: Build[];
  roomList: Rooms[];
  dataDeviceList: Device[];

  constructor(private managerService: ManagerService) { }

  ngOnInit() {
    var x = this.managerService.getDataBuild();
    x.snapshotChanges().subscribe(item => {
      this.buildList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.buildList.push(y as Build);
      });
    });

    var x = this.managerService.getDataRoom();
    x.snapshotChanges().subscribe(item => {
      this.roomList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.roomList.push(y as Rooms);
      });
    });

    var x = this.managerService.getDataDevice();
    x.snapshotChanges().subscribe(item => {
      this.dataDeviceList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.dataDeviceList.push(y as Device);
      });
    });
  }

  onEdit(emp: Build) {
    this.managerService.selectedBuild = Object.assign({}, emp);
  }

}