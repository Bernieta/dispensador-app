import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonContent,
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { onValue, push, ref, remove, set } from 'firebase/database';
import { database } from '../config/fire';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonMenuButton,
    IonContent,
    IonInput,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class WhatsappComponent implements OnInit {
  @ViewChild('phoneInput', { static: false }) phoneInput!: IonInput;
  @ViewChild('keyInput', { static: false }) keyInput!: IonInput;
  phones: any[] = [];
  phone: string;

  constructor() {}

  ngOnInit() {
    this.getPhones();
    this.getPhone();
  }

  public registerPhone() {
    const query = ref(database, 'numeros');
    push(query, { num: this.phoneInput.value, llav: this.keyInput.value });
    this.phoneInput.value = '';
    this.keyInput.value = '';
  }

  public callPhone(value: string, llav: string) {
    const query = ref(database, 'numero');
    const quer2 = ref(database, 'key');
    set(query, `57${value}`);
    set(quer2, llav);
  }

  public getPhones() {
    const query = ref(database, 'numeros');
    onValue(query, (snap) => {
      if (!snap.exists()) return;
      this.phones = Object.entries(snap.val()).map(([key, num]) => ({
        key,
        num,
      }));
    });
  }

  public remove(key: string) {
    const query = ref(database, `numeros/${key}`);
    remove(query);
    this.getPhones();
  }

  public getPhone() {
    const query = ref(database, 'numero');
    onValue(query, (snap) => {
      if (!snap.exists()) return;
      this.phone = `+${snap.val()}`;
    });
  }
}
