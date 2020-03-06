import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../service/manager/manager.service'

@Component({
  selector: 'app-manager',
  templateUrl: './manage-build.component.html',
  styleUrls: ['./manage-build.component.css']
})
export class ManageBuildComponent implements OnInit {

  constructor( public managerService :ManagerService ) { }

  ngOnInit() {
    
  }

}
