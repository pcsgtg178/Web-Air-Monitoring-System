import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ManagerService } from '../../../service/manager/manager.service';
import { Build, Rooms, Device } from '../../../service/manager/manager.model';

@Component({
  selector: 'list-device',
  templateUrl: './list-device.component.html',
  styleUrls: ['./list-device.component.css']
})
export class ListDeviceComponent implements OnInit {

  buildList: Build[];
  roomList: Rooms[];
  dataDeviceList: Device[];

  resultsLength = 0;
  displayedColumns: string[] = ['Build_name', '$key', 'Address', 'trash'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private managerService: ManagerService,
  ) { }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;

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
  
  dataSource= new MatTableDataSource<Rooms>(this.roomList);

  onEdit(emp: Rooms) {
    this.managerService.selectedRooms = Object.assign({}, emp);
  }

  onDelete(build: string, room: string ) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.managerService.deleteDevice(build, room);
    }
  }

}
