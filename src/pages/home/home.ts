import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sounds = {
    yes: new Audio("assets/sound/yes.mp3"),
    no: new Audio("assets/sound/no.mp3"),
    ding: new Audio("assets/sound/ding.mp3"),
    bell: new Audio("assets/sound/bell.mp3"),
  }
  sock: WebSocket;

  constructor(public navCtrl: NavController) {

  }

  async ionViewDidLoad() {
    this.hookupSocket();
  }

  hookupSocket() {
    this.sock = new WebSocket("ws://192.168.2.107:8080");
    this.sock.addEventListener('open', () => {
      this.sock.send('Hello Server!');
    });
    this.sock.addEventListener("close", () => {
      setTimeout(() => {
        this.hookupSocket();
      }, 5000);
    });
    this.sock.addEventListener("message", message => {
      if (this.sounds.hasOwnProperty(message.data)) {
        this.sounds[message.data].play();
      }
    });
  }

}
