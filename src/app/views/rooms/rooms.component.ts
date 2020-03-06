import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

import { Builds }  from '../../service/rooms/rooms.model';
import { RoomsService } from '../../service/rooms/rooms.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { tileLayer, latLng, marker, icon } from 'leaflet'
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  buildList: Builds[];

  Building: any=[];
  Rooms: any=[];
  Valdata: any=[];
  
  build: FormControl;
  sortSelect: FormGroup;

  checkValdata: boolean = false
  checkData: boolean = true

  constructor( 
    public firebase :AngularFireDatabase,
    private _router: Router,
    public roomsService: RoomsService, 

   ){ 
    }
  
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  ICTmarker = marker([ 19.0273849, 99.9001545 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  CEmarker = marker([ 19.031333, 99.894722 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  layers = [
    this.ICTmarker,
    this.CEmarker
  ]

  options = {
    layers: [
      this.streetMaps
    ],
    zoom: 15,
    center: latLng(19.029844, 99.8938628)
  };
  
  ngOnInit() {
    
    this.createFormControls();
    this.createForm();

    var x = this.roomsService.getData();
    x.snapshotChanges().subscribe(item => {
      this.buildList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.buildList.push(y as Builds);
      });
    });

    this.firebase.list('System/Building/ICT/Rooms/', ref => ref)
    .valueChanges().subscribe((data:any)=> {
      data.forEach((value: any)=> {
        this.Rooms.push({
          adr: value.Address,
          room: value.Room_number,
        });
      
        this.firebase.list('System/Sensor/'+value.Room_number, ref => ref
        .limitToLast(1))
        .valueChanges()
        .subscribe((data: any)=>{
          data.forEach((val: any)=> {
            this.Valdata.push({
              pm10p0 : val.PM10p0,
              pm2p5 : val.PM2p5,
              temp: val.Temperature,
              humu: val.Humidity
            })
            setTimeout(() => {
              this.checkValdata = true
              console.log("checkData: "+this.checkData)
              console.log(this.checkValdata)
            }, 0)
          })
        })
      })
    })

    this.firebase.list('System/Building/', ref => ref)
    .valueChanges().subscribe((data:any) => {
      data.forEach((values: any) =>{
        this.Building.push({
          build_nme  : values.Build_name,
          lat  : values.latitude,
          lng  : values.longtude,
        })
      })
    })
  }

  createFormControls(){
    this.build = new FormControl('', Validators.required);
  }

  createForm(){
    this.sortSelect = new FormGroup({
      build: this.build
    });
  }

  onSelect(){
    
    this.Rooms=[];
    this.Valdata=[];

    if(this.sortSelect.valid){

      this.firebase.list('System/Building/'+this.sortSelect.value.build+'/Rooms/', ref => ref)
      .valueChanges().subscribe((data:any)=> {
        data.forEach((values: any)=> {
          this.Rooms.push({
            adr: values.Address,
            room: values.Room_number,
          });
        
          this.firebase.list('System/Sensor/'+values.Room_number, ref => ref
          .limitToLast(1))
          .valueChanges()
          .subscribe((data: any)=>{
            data.forEach((val: any)=> {
              this.Valdata.push({
                pm10p0 : val.PM10p0,
                pm2p5 : val.PM2p5,
                temp: val.Temperature,
                humu: val.Humidity
              })
              setTimeout(() => {
                this.checkValdata = true
                console.log(this.checkValdata)
              }, 0)
            })
          })
        })
      })
      }
  }

  SelectRoom(roomNumber: string){
    this._router.navigate(['/dashboards',roomNumber]);
  }
}
