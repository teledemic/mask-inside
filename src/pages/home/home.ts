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
    yes_center: new Audio("assets/sound/yes_center.ogg"),
    yes_left: new Audio("assets/sound/yes_left.ogg"),
    yes_right: new Audio("assets/sound/yes_right.ogg"),
    no_center: new Audio("assets/sound/no_center.ogg"),
    no_left: new Audio("assets/sound/no_left.ogg"),
    no_right: new Audio("assets/sound/no_right.ogg"),
    ding_center: new Audio("assets/sound/ding_center.ogg"),
    ding_left: new Audio("assets/sound/ding_left.ogg"),
    ding_right: new Audio("assets/sound/ding_right.ogg"),
    bell_center: new Audio("assets/sound/bell_center.ogg"),
    bell_left: new Audio("assets/sound/bell_left.ogg"),
    bell_right: new Audio("assets/sound/bell_right.ogg"),
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
      this.sock = socketio("http://192.168.2.100:8080");
      this.sock.on("sound", msg => {
        this.message = msg;
        if (this.sounds.hasOwnProperty(msg)) {
          this.sounds[msg].play();
        }
      });
      this.sock.on("connect", msg => {
        this.error = "Connected";
        this.message = msg;
      });
      this.sock.on("connect_failed", msg => {
        this.error = "connect_failed";
        this.message = msg;
      });
      this.sock.on("reconnect_failed", msg => {
        this.error = "reconnect_failed";
        this.message = msg;
      });
      this.sock.on("error", msg => {
        this.error = "error";
        this.message = msg;
      });
    } catch (err) {
      this.message = err;
    }
  }

}
