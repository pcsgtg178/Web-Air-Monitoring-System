import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-lv-stand',
  templateUrl: './lv-stand.component.html',
  styleUrls: ['./lv-stand.component.css']
})
export class LvStandComponent implements OnInit {

  lev1_st:number;
  lev2_st:number;
  lev3_st:number;
  lev4_st:number;
  lev5_st:number;

  lev1_en:number;
  lev2_en:number;
  lev3_en:number;
  lev4_en:number;
  lev5_en:number;

  items: Observable<any[]>;

  constructor( private db: AngularFireDatabase ) { 
    this.items = db.list('level_standard').valueChanges();
  }

  ngOnInit() {
   
  }

  setLev(){
    const itemRef = this.db.object('System/level_standard');
    itemRef.update({ 
      lev1_st: this.lev1_st, lev1_en: this.lev1_en,
      lev2_st: this.lev2_st, lev2_en: this.lev2_en,
      lev3_st: this.lev3_st, lev3_en: this.lev3_en,
      lev4_st: this.lev4_st, lev4_en: this.lev4_en,
      lev5_st: this.lev5_st, lev5_en: this.lev5_en 
    });
    this.lev1_st = null;
    this.lev2_st = null;
    this.lev3_st = null;
    this.lev4_st = null;
    this.lev5_st = null;

    this.lev1_en = null;
    this.lev2_en = null;
    this.lev3_en = null;
    this.lev4_en = null;
    this.lev5_en = null;
  }

}
