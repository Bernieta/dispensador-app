import { Component, OnInit } from '@angular/core';
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
  IonRange,
} from '@ionic/angular/standalone';
import { onValue, ref, set } from 'firebase/database';
import { database } from '../config/fire';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
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
    IonRange,
  ],
})
export class FolderPage implements OnInit {
  segmentValue: number;
  startDateTime: string;
  endDateTime: string;
  textStartDateTime: string;
  textEndDateTime: string;
  activeAlert: boolean = false;
  percentage: number;
  rangeValue: number;
  sensorValue: number;
  sensorProxValue: number;
  sensorDactValue: number;

  constructor() {}

  ngOnInit() {
    this.getPower();
    this.getStartDateTime();
    this.getEndDateTime();
    this.getPercentage();
    this.getRange();
    this.getSensor();
    this.getSensorProx();
    this.getSensorDact();
  }

  public power(event: Event) {
    const value = (event as CustomEvent).detail.value;
    const query = ref(database, 'apagar');
    set(query, Number(value));
  }

  public captureStartDateTime(event: Event) {
    this.startDateTime = (event as CustomEvent).detail.value;
  }

  public captureEndDateTime(event: Event) {
    this.endDateTime = (event as CustomEvent).detail.value;
  }

  public enableDateTimeRange() {
    if (!this.startDateTime || !this.endDateTime) return;

    if (new Date(this.startDateTime) > new Date(this.endDateTime)) {
      this.activeAlert = true;
      return;
    }

    const query1 = ref(database, 'inicio');
    const query2 = ref(database, 'finalizacion');
    set(query1, this.startDateTime.replace(':00', ''));
    set(query2, this.endDateTime.replace(':00', ''));
    this.activeAlert = false;
  }

  public range(event: Event) {
    const value = (event as CustomEvent).detail.value;
    const query = ref(database, 'cantidad');
    set(query, value);
  }

  public sensorProx(value: number[]) {
    const query = ref(database, 'proximidad');
    if (this.sensorProxValue === 1) set(query, value[0]);
    else set(query, value[1]);
  }

  public sensorDact(value: number[]) {
    const query = ref(database, 'dactilar');
    if (this.sensorDactValue === 1) set(query, value[0]);
    else set(query, value[1]);
  }

  public getPower() {
    const query = ref(database, 'apagar');
    onValue(query, (snap) => {
      if (!snap.exists()) return;
      this.segmentValue = snap.val() as number;
    });
  }

  public getStartDateTime() {
    const query = ref(database, 'inicio');
    onValue(query, (snap) => {
      if (!snap.exists()) return;
      this.textStartDateTime = snap.val();
    });
  }

  public getEndDateTime() {
    const query = ref(database, 'finalizacion');
    onValue(query, (snap) => {
      if (!snap.exists()) return;
      this.textEndDateTime = snap.val();
    });
  }

  public getPercentage() {
    const query = ref(database, 'porcentaje');
    onValue(query, (snap) => {
      if (!snap.exists()) return;
      this.percentage = snap.val() as number;
    });
  }

  public getRange() {
    const query = ref(database, 'cantidad');
    onValue(query, (snap) => {
      if (!snap.exists()) return;
      this.rangeValue = snap.val() as number;
    });
  }

  public getSensor() {
    const query = ref(database, 'sensor');
    onValue(query, (snap) => {
      if (!snap.exists()) return;
      this.sensorValue = snap.val() as number;
    });
  }

  public getSensorProx() {
    const query = ref(database, 'proximidad');
    onValue(query, (snap) => {
      if (!snap.exists()) return;
      this.sensorProxValue = snap.val() as number;
    });
  }

  public getSensorDact() {
    const query = ref(database, 'dactilar');
    onValue(query, (snap) => {
      if (!snap.exists()) return;
      this.sensorDactValue = snap.val() as number;
    });
  }
}
