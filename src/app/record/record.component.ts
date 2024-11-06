import { Component, NgModule, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonListHeader,
  IonItem,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { onValue, ref } from 'firebase/database';
import { database } from '../config/fire';
import { Record } from '../interfaces/record';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonList,
    IonListHeader,
    IonItem,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonButton,
    IonIcon,
  ],
})
export class RecordComponent implements OnInit {
  dateValue: string;
  records: Record[] = [];

  constructor() {}

  ngOnInit() {
    this.getRecords();
  }

  public captureDate(event: Event) {
    this.dateValue = (event as CustomEvent).detail.value;
  }

  public eventFilterButton() {
    if (!this.dateValue) return;
    this.getRecords();
  }

  public getRecords() {
    const query = ref(database, 'historial');
    onValue(query, (snap) => {
      if (!snap.exists()) {
        this.records = [];
        return;
      }
      const values = Object.values(snap.val()) as Record[];
      this.applyFilter(values);
    });
  }

  public toDateZeroHours(date: Date) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00`;
  }

  public filter(array: Record[], date: Date) {
    return array.filter(
      (a) =>
        new Date(this.toDateZeroHours(new Date(a.date))).getTime() ===
        new Date(this.toDateZeroHours(date)).getTime()
    );
  }

  public applyFilter(array: Record[]) {
    const currentDate = new Date();
    if (!this.dateValue) {
      this.records = this.filter(array, currentDate);
    } else {
      this.records = this.filter(array, new Date(this.dateValue));
    }
  }
}
