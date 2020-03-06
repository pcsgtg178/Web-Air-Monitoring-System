import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ManagerService } from '../../../service/manager/manager.service';

@Component({
  selector: 'add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.css']
})
export class AddBuildingComponent implements OnInit {

  constructor( public managerService: ManagerService
  ) { }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(buildForm: NgForm){
    if(buildForm.value.$key == null)
      this.managerService.insertBuild(buildForm.value);
    
    else
      this.managerService.updateBuild(buildForm.value);
      this.resetForm(buildForm);
    
  }

  resetForm(buildForm?: NgForm){
    if(buildForm != null)
    buildForm.reset();
    this.managerService.selectedBuild = {
      $key: null,
      latitude: '',
      longitude: '',
      Build_name: '',
      Detail: '',
    }

  }
}
