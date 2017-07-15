import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import * as socketio from "socket.io-client";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  message = "";
  error = "";
  sock: any;

  constructor(public navCtrl: NavController, private nativeAudio: NativeAudio, private platform: Platform) {
    platform.ready().then(() => {
      this.message = "ready";
      this.nativeAudio.preloadSimple('yes_center', 'assets/sound/yes_center.ogg');
      this.nativeAudio.preloadSimple('yes_left', 'assets/sound/yes_left.ogg');
      this.nativeAudio.preloadSimple('yes_right', 'assets/sound/yes_right.ogg');
      this.nativeAudio.preloadSimple('no_center', 'assets/sound/no_center.ogg');
      this.nativeAudio.preloadSimple('no_left', 'assets/sound/no_left.ogg');
      this.nativeAudio.preloadSimple('no_right', 'assets/sound/no_right.ogg');
      this.nativeAudio.preloadSimple('ding_center', 'assets/sound/ding_center.ogg');
      this.nativeAudio.preloadSimple('ding_left', 'assets/sound/ding_left.ogg');
      this.nativeAudio.preloadSimple('ding_right', 'assets/sound/ding_right.ogg');
      this.nativeAudio.preloadSimple('bell_center', 'assets/sound/bell_center.ogg');
      this.nativeAudio.preloadSimple('bell_left', 'assets/sound/bell_left.ogg');
      this.nativeAudio.preloadSimple('bell_right', 'assets/sound/bell_right.ogg');
    });    
  }



  ionViewDidLoad() {
    // this.nativeAudio.preloadComplex('yes_center', 'assets/sound/yes_center.ogg', 1, 4, 0).then(() => {
    //   this.message = "loaded";
    // }).catch(err => {
    //   this.message = err;
    //   console.log(err);
    // });
    this.hookupSocket();
  }

  hookupSocket() {
    try {
      this.error = "opening";
      this.sock = socketio("http://192.168.2.107:8080");
      this.sock.on("sound", msg => {
        this.error = msg;
        this.nativeAudio.play(msg).catch(err => {
          this.message = err;
        });
        // if (this.sounds.hasOwnProperty(msg)) {
        //   this.sounds[msg].play();
        // }
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
