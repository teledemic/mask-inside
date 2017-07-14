import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  yes = new Audio("assets/sound/yes.wav");
  no = new Audio("assets/sound/no.mp3");

  constructor(public navCtrl: NavController) {

  }

  async ionViewDidLoad() {
    this.yes.play();
    this.no.play();
  }

}
