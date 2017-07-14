import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('video1') video1; 
  @ViewChild('video2') video2; 
  stream: MediaStream;

  constructor(public navCtrl: NavController) {

  }

  async ionViewDidLoad() {
    this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    this.video1.nativeElement.srcObject = this.stream;
    this.video2.nativeElement.srcObject = this.stream;
  }

}
