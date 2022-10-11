import { Component, OnInit } from '@angular/core';
import NavigatorHerlper from 'src/app/libs/helpers/navigator.helper';

@Component({
  selector: 'app-uno',
  templateUrl: './uno.component.html',
  styleUrls: ['./uno.component.scss']
})
export class UnoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getDevices()
  }

  getLocation(){
    NavigatorHerlper.getLocation()
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
  }

  getLocationC(){
    NavigatorHerlper.getLocationC(
      (position) => {
        console.log(position);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  start(video: HTMLVideoElement, btn: HTMLElement){
    console.log(video);

    NavigatorHerlper.startRecord(video, btn)
  }

  getDevices(){
    NavigatorHerlper.getDevices()
  }

  startAudio(audio: HTMLAudioElement, btn: HTMLElement){
    NavigatorHerlper.startRecordAudio(audio, btn)
  }

}
