import { Component, OnInit } from '@angular/core';
// const url = '../../node_modules/media-stream-library/examples/browser/camera/simple-player.js';
import {components, pipelines} from 'media-stream-library';

declare var stream;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularRTSP';

  ngAfterViewInit() {
    // let mediaStreamLibrary;
  }

  ngOnInit() {
    // console.log('preparing to load...')
    // console.log(url);
    
    //     let node = document.createElement('script');
    //     node.src = url;
    //     node.type = 'text/javascript';
    //     node.async = true;
    //     node.charset = 'utf-8';
    //     document.getElementsByTagName('head')[0].appendChild(node);
  }

  host = "10.124.27.114";
  currentPipeline;

  authorize = async () => {
    // Force a login by fetching usergroup
    let fetchOptions = {
      credentials: 'include',
      headers: {
        'Axis-Orig-Sw': true,
        'X-Requested-With': 'XMLHttpRequest',
      },
      mode: 'no-cors',
    }

    try {
      await window.fetch(`http://10.124.27.114/axis-cgi/usergroup.cgi`)
    } catch (err) {
      console.error(err)
    }
  }

  playVideo() {
    let videoElement = <HTMLVideoElement>document.getElementById("video");
    let canvasElement = <HTMLCanvasElement>document.getElementById("canvas");

    let Pipeline
    let mediaElement
     Pipeline = pipelines.RtspMjpegPipeline
    mediaElement = canvasElement
    // hide the other output
    // videoElement.style.display = ''
    canvasElement.style.display = 'none'

    const pipeline = new Pipeline({
      ws: { uri: `ws://10.124.27.114/rtsp-over-websocket` },
      rtsp: { uri: `rtsp://10.124.27.114/axis-media/media.amp?videocodec=h264` },
      mediaElement,
    })
    pipeline.ready.then(() => {
      pipeline.rtsp.play()
    })
  
    return pipeline
  }

  play() {
    this.currentPipeline && this.currentPipeline.close()
  
    // await this.authorize()
  
    this.currentPipeline = this.play()
  }
    
}
