import { Injectable } from '@angular/core';
import { ElectronService } from './electron/electron.service';
import * as ffmpegstatic from "ffmpeg-static";
import * as youtubeMp3Downloader from "youtube-mp3-downloader";
import { UserSettingsService } from './user-settings.service';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private pathToFfmpeg: typeof ffmpegstatic;
  private youtubeMp3Downloader: typeof youtubeMp3Downloader;

  constructor(
    private _electron: ElectronService,
    private _userSettings: UserSettingsService
  ) {
    if (this._electron.isElectron) {
      this.pathToFfmpeg = window.require('ffmpeg-static');
      this.youtubeMp3Downloader = window.require('youtube-mp3-downloader');
    }
  }

  public download(url: string): Observable<any> {

    if (!this._electron.isElectron) {
      return;
    }

    if (!this._userSettings.settings.pathToSave) {
      throw new Error('Path not specified!');
    }

    //Configure YoutubeMp3Downloader with your settings
    var YD = new this.youtubeMp3Downloader({
      "ffmpegPath": this.pathToFfmpeg,                          // Where is the FFmpeg binary located?
      "outputPath": this._userSettings.settings.pathToSave,     // Where should the downloaded and encoded files be stored?
      "youtubeVideoQuality": "highest",                         // What video quality should be used?
      "queueParallelism": 2,                                    // How many parallel downloads/encodes should be started?
      "progressTimeout": 2000                                   // How long should be the interval of the progress reports
    });

    //Download video and save as MP3 file
    // YD.download("4mxXdCUXSSs");
    YD.download(url);

    return Observable.create(
      (observer: Observer<any>) => {
        YD.on("finished", function (err, data) {
          observer.next(data);
          observer.complete();
        });

        YD.on("error", function (error) {
          observer.error(error);
        });

        YD.on("progress", function (progress) {
          observer.next(progress);
        });
      }
    )
  }

  private getVideoCode(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      //error
    }
  }
}
