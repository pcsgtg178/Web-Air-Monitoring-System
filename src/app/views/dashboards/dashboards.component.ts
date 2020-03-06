import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AngularFireDatabase } from 'angularfire2/database';

import { Chart } from 'chart.js';

import { LocalDataSource } from 'ng2-smart-table';

import { ExcelService } from '../../service/excel/excel.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {

  roomNumber:any;
  listSensor: any[];
  listBuilding: any[];

  sortTable: FormGroup;
  start_date: FormControl;
  end_date: FormControl;
  device: FormControl;
  sortData:any;

  public LineChartpm: Chart
  public LineChartweather: Chart

  constructor(
    private location: Location,
    private firebase: AngularFireDatabase,
    private _router: ActivatedRoute,
    private ExcelService: ExcelService
  ) { }

  ngOnInit() {
    this.roomNumber = this._router.snapshot.params['roomNumber'];

    this.createFormControls();
    this.createForm();

    this.firebase.list('System/Sensor/'+this.roomNumber, ref => ref
      .limitToLast(1))
      .valueChanges().subscribe((datasensor: any) => {
        this.listSensor = datasensor
      })

    this.firebase.list('System/Buildig', ref => ref
      .limitToLast(1))
      .valueChanges().subscribe((data: any) => {
        this.listBuilding = data
      })

    this.loadChart();
  }

  loadChart() {
    let dataTime: any = []
    let dataPM2p5: any = []
    let dataPM10p0: any = []
    let dataTemp: any = []
    let dataHum: any = []

    this.firebase.list('System/Sensor/'+this.roomNumber, ref => ref
      .limitToLast(12))
      .valueChanges().subscribe((data: any) => {
        data.forEach(function (value: any) {
          dataTime.push(value.At_Time)
          dataTemp.push(value.Temperature)
          dataHum.push(value.Humidity)
          dataPM2p5.push(value.PM2p5)
          dataPM10p0.push(value.PM10p0)
        })
        if (this.LineChartpm) this.LineChartpm.destroy();
        this.LineChartpm = new Chart('lineChartpm', {
          type: 'line',
          data: {
            labels: dataTime,
            datasets: [{
              label: 'PM2.5',
              data: dataPM2p5,
              fill: false,
              lineTension: 0.3,
              borderColor: "gray",
            },
            {
              label: 'PM10',
              data: dataPM10p0,
              fill: false,
              lineTension: 0.3,
              borderColor: "brown",
            }]

          },
          options: {
            legend: {
              display: true,
              // position: "bottom"
            },
            scales: {
              xAxes: [{
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  // maxTicksLimit: 6,
                  // stepSize: Math.ceil(120 / 6),
                  // max: 120
                }
              }]
            },
            responsive: true,
            maintainAspectRatio: false,
          }
        })

        if (this.LineChartweather) this.LineChartweather.destroy();
        this.LineChartweather = new Chart('lineChartweather', {
          type: 'line',
          data: {
            labels: dataTime,
            datasets: [{
              label: 'Temperature',
              data: dataTemp,
              lineTension: 0.3,
              fill: false,
              borderColor: 'red',
              backgroundColor: 'transparent',
            },
            {
              label: 'Humidity',
              data: dataHum,
              lineTension: 0.3,
              fill: false,
              borderColor: 'blue',
              backgroundColor: 'transparent',
            }]
          },
          options: {
            legend: {
              display: true,
              // position: "bottom"
            },
            scales: {
              xAxes: [{
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  // maxTicksLimit: 6,
                  // stepSize: Math.ceil(120 / 6),
                  // max: 120
                }
              }]
            },
            responsive: true,
            maintainAspectRatio: false,
          }
        })
        dataPM2p5 = [];
        dataPM10p0 = [];
        dataHum = [];
        dataTime = [];
        dataTemp = [];
      })
  }

  oneHr() {
    let dataTime: any = []
    let dataPM2p5: any = []
    let dataPM10p0: any = []
    let dataTemp: any = []
    let dataHum: any = []

    this.firebase.list('System/Sensor/'+this.roomNumber, ref => ref
      .limitToLast(12))
      .valueChanges().subscribe((data: any) => {
        data.forEach(function (value: any) {
          dataTime.push(value.At_Time)
          dataTemp.push(value.Temperature)
          dataHum.push(value.Humidity)
          dataPM2p5.push(value.PM2p5)
          dataPM10p0.push(value.PM10p0)
        })
        if (this.LineChartpm) this.LineChartpm.destroy();
        this.LineChartpm = new Chart('lineChartpm', {
          type: 'line',
          data: {
            labels: dataTime,
            datasets: [{
              label: 'PM2.5',
              data: dataPM2p5,
              fill: false,
              lineTension: 0.3,
              borderColor: "gray",
            },
            {
              label: 'PM10',
              data: dataPM10p0,
              fill: false,
              lineTension: 0.3,
              borderColor: "brown",
            }]

          },
          options: {
            legend: {
              display: true,
              // position: "bottom"
            },
            scales: {
              xAxes: [{
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  // maxTicksLimit: 6,
                  // stepSize: Math.ceil(120 / 6),
                  // max: 120
                }
              }]
            },
            responsive: true,
            maintainAspectRatio: false,
          }
        })

        if (this.LineChartweather) this.LineChartweather.destroy();
        this.LineChartweather = new Chart('lineChartweather', {
          type: 'line',
          data: {
            labels: dataTime,
            datasets: [{
              label: 'Temperature',
              data: dataTemp,
              lineTension: 0.3,
              fill: false,
              borderColor: 'red',
              backgroundColor: 'transparent',
            },
            {
              label: 'Humidity',
              data: dataHum,
              lineTension: 0.3,
              fill: false,
              borderColor: 'blue',
              backgroundColor: 'transparent',
            }]
          },
          options: {
            legend: {
              display: true,
              // position: "bottom"
            },
            scales: {
              xAxes: [{
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  // maxTicksLimit: 6,
                  // stepSize: Math.ceil(120 / 6),
                  // max: 120
                }
              }]
            },
            responsive: true,
            maintainAspectRatio: false,
          }
        })
        dataPM2p5 = [];
        dataPM10p0 = [];
        dataHum = [];
        dataTime = [];
        dataTemp = [];
      })
  }

  threeHr() {
    let dataTime: any = []
    let dataPM2p5: any = []
    let dataPM10p0: any = []
    let dataTemp: any = []
    let dataHum: any = []

    this.firebase.list('System/Sensor/'+this.roomNumber, ref => ref
      .limitToLast(36))
      .valueChanges().subscribe((data: any) => {
        data.forEach(function (value: any) {
          dataTime.push(value.At_Time)
          dataTemp.push(value.Temperature)
          dataHum.push(value.Humidity)
          dataPM2p5.push(value.PM2p5)
          dataPM10p0.push(value.PM10p0)
        })
        if (this.LineChartpm) this.LineChartpm.destroy();
        this.LineChartpm = new Chart('lineChartpm', {
          type: 'line',
          data: {
            labels: dataTime,
            datasets: [{
              label: 'PM2.5',
              data: dataPM2p5,
              fill: false,
              lineTension: 0.3,
              borderColor: "gray",
            },
            {
              label: 'PM10',
              data: dataPM10p0,
              fill: false,
              lineTension: 0.3,
              borderColor: "brown",
            }]

          },
          options: {
            legend: {
              display: true,
              // position: "bottom"
            },
            scales: {
              xAxes: [{
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  // maxTicksLimit: 6,
                  // stepSize: Math.ceil(120 / 6),
                  // max: 120
                }
              }]
            },
            responsive: true,
            maintainAspectRatio: false,
          }
        })

        if (this.LineChartweather) this.LineChartweather.destroy();
        this.LineChartweather = new Chart('lineChartweather', {
          type: 'line',
          data: {
            labels: dataTime,
            datasets: [{
              label: 'Temperature',
              data: dataTemp,
              lineTension: 0.3,
              fill: false,
              borderColor: 'red',
              backgroundColor: 'transparent',
            },
            {
              label: 'Humidity',
              data: dataHum,
              lineTension: 0.3,
              fill: false,
              borderColor: 'blue',
              backgroundColor: 'transparent',
            }]
          },
          options: {
            legend: {
              display: true,
              // position: "bottom"
            },
            scales: {
              xAxes: [{
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  // maxTicksLimit: 6,
                  // stepSize: Math.ceil(120 / 6),
                  // max: 120
                }
              }]
            },
            responsive: true,
            maintainAspectRatio: false,
          }
        })
        dataPM2p5 = [];
        dataPM10p0 = [];
        dataHum = [];
        dataTime = [];
        dataTemp = [];
      })
  }

  sixHr() {
    let dataTime: any = []
    let dataPM2p5: any = []
    let dataPM10p0: any = []
    let dataTemp: any = []
    let dataHum: any = []

    this.firebase.list('System/Sensor/'+this.roomNumber, ref => ref
      .limitToLast(36))
      .valueChanges().subscribe((data: any) => {
        data.forEach(function (value: any) {
          dataTime.push(value.At_Time)
          dataTemp.push(value.Temperature)
          dataHum.push(value.Humidity)
          dataPM2p5.push(value.PM2p5)
          dataPM10p0.push(value.PM10p0)
        })
        if (this.LineChartpm) this.LineChartpm.destroy();
        this.LineChartpm = new Chart('lineChartpm', {
          type: 'line',
          data: {
            labels: dataTime,
            datasets: [{
              label: 'PM2.5',
              data: dataPM2p5,
              fill: false,
              lineTension: 0.3,
              borderColor: "gray",
            },
            {
              label: 'PM10',
              data: dataPM10p0,
              fill: false,
              lineTension: 0.3,
              borderColor: "brown",
            }]

          },
          options: {
            legend: {
              display: true,
              // position: "bottom"
            },
            scales: {
              xAxes: [{
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  // maxTicksLimit: 6,
                  // stepSize: Math.ceil(120 / 6),
                  // max: 120
                }
              }]
            },
            responsive: true,
            maintainAspectRatio: false,
          }
        })

        if (this.LineChartweather) this.LineChartweather.destroy();
        this.LineChartweather = new Chart('lineChartweather', {
          type: 'line',
          data: {
            labels: dataTime,
            datasets: [{
              label: 'Temperature',
              data: dataTemp,
              lineTension: 0.3,
              fill: false,
              borderColor: 'red',
              backgroundColor: 'transparent',
            },
            {
              label: 'Humidity',
              data: dataHum,
              lineTension: 0.3,
              fill: false,
              borderColor: 'blue',
              backgroundColor: 'transparent',
            }]
          },
          options: {
            legend: {
              display: true,
              // position: "bottom"
            },
            scales: {
              xAxes: [{
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  // maxTicksLimit: 6,
                  // stepSize: Math.ceil(120 / 6),
                  // max: 120
                }
              }]
            },
            responsive: true,
            maintainAspectRatio: false,
          }
        })
        dataPM2p5 = [];
        dataPM10p0 = [];
        dataHum = [];
        dataTime = [];
        dataTemp = [];
      })
  }

  createFormControls() {
    this.start_date = new FormControl('', Validators.required);
    this.end_date = new FormControl('', Validators.required);
  }
  createForm() {
    this.sortTable = new FormGroup({
      start_date: this.start_date,
      end_date: this.end_date
    });
  }

  onSubmit() {
    if (this.sortTable.valid) {
      // this.sortTable.reset();
      this.firebase.list('System/Sensor/'+this.roomNumber, ref => ref
      .orderByChild("At_Date")
      .startAt(this.sortTable.value.start_date)
      .endAt(this.sortTable.value.end_date))
      .valueChanges().subscribe((data:any)=> {
        this.sortData= data
        this.source.load(this.sortData);
      })
    }
  }

  exportAsXLSX():void {
    this.ExcelService.exportAsExcelFile(this.sortData, this.roomNumber+'_'+new Date().toLocaleString());
  }
  
  settings = {
    columns: {
      At_Date: {
        title: 'วันที่ (Date)',
        type: 'string',
        filter: false,
        sortDirection: 'desc'
      },
      At_Time: {
        title: 'เวลา (Time)',
        type: 'string',
        filter: false,
      },
      PM2p5: {
        title: 'PM2p5',
        type: 'string',
        filter: false
      },
      PM10p0: {
        title: 'PM10p0',
        type: 'string',
        filter: false
      },
      Temperature: {
        title: 'อุณหภูมิ (Temperature)',
        type: 'string',
        filter: false
      },
      Humidity: {
        title: 'ความชื้น (Humidity)',
        type: 'string',
        filter: false
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };
  source: LocalDataSource = new LocalDataSource();

  goBack(): void {
    this.location.back();
  }
}
