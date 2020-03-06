import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { ManagerService } from '../../../service/manager/manager.service';
@Component({
  selector: 'add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  constructor( public managerService: ManagerService ) { }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(deviceForm: NgForm){
    if(deviceForm.value.$key == null)
      this.managerService.insertDevice(deviceForm.value);
    
    else
      this.managerService.updateDevice(deviceForm.value);
      this.resetForm(deviceForm);
    
  }

  resetForm(deviceForm?: NgForm){
    if(deviceForm != null)
    deviceForm.reset();
    this.managerService.selectedRooms = {
      $key: null,
      Room_number: '',
      Address: '',
      Build_name: '',
    }

  }
}
