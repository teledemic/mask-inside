import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as socketio from "socket.io-client";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  message = "";
  error = "";
  sounds = {
    yes: new Audio("assets/sound/yes.mp3"),
    no: new Audio("assets/sound/no.mp3"),
    ding: new Audio("assets/sound/ding.mp3"),
    bell: new Audio("assets/sound/bell.mp3"),
  }
  sock: any;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    this.hookupSocket();
  }

  hookupSocket() {
    try {
      this.error = "opening";
      this.sock = socketio("192.168.2.107:8080");
      this.sock.on("sound", msg => {
        if (this.sounds.hasOwnProperty(msg)) {
          this.sounds[msg].play();
        }
      });
    } catch (err) {
      this.message = err;
    }
  }

}
