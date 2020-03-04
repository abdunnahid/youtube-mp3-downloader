import { Injectable } from '@angular/core';
import { ElectronService } from './electron/electron.service';
import * as ffmpegstatic from "ffmpeg-static";
import * as youtubeMp3Downloader from "youtube-mp3-downloader";

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private pathToFfmpeg: typeof ffmpegstatic;
  private youtubeMp3Downloader: typeof youtubeMp3Downloader;

  constructor(
    private _electron: ElectronService
  ) {
    if (this._electron.isElectron) {
      this.pathToFfmpeg = window.require('ffmpeg-static');
      this.youtubeMp3Downloader = window.require('youtube-mp3-downloader');
    }
  }

  public download(url?): void {
    if (!this._electron.isElectron) {
      return;
    }
    
    //Configure YoutubeMp3Downloader with your settings
    var YD = new this.youtubeMp3Downloader({
      "ffmpegPath": this.pathToFfmpeg,        // Where is the FFmpeg binary located?
      "outputPath": "D:/ULAB/Projects/youtube-mp3-downloader/output",    // Where should the downloaded and encoded files be stored?
      "youtubeVideoQuality": "highest",       // What video quality should be used?
      "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
      "progressTimeout": 2000                 // How long should be the interval of the progress reports
    });

    //Download video and save as MP3 file
    YD.download("4mxXdCUXSSs");

    YD.on("finished", function (err, data) {
      console.log(JSON.stringify(data));
    });

    YD.on("error", function (error) {
      console.log(error);
    });

    YD.on("progress", function (progress) {
      console.log(JSON.stringify(progress));
    });
  }

}
