import { Injectable } from '@angular/core';
import { ElectronService } from './electron/electron.service';
import * as ffmpegstatic from "ffmpeg-static";
import * as youtubeMp3Downloader from "youtube-mp3-downloader";
import { Observable, Observer } from 'rxjs';
import { DownloadProgress, DownLoadFinished } from '../../models';

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

  public download(url: string, directory: string): Observable<DownloadProgress | DownLoadFinished> {

    if (!this._electron.isElectron) {
      return;
    }

    if (!directory) {
      throw new Error('Path not specified!');
    }

    const videoCode = this.getVideoCode(url);

    if (!videoCode) {
      return Observable.throw(false);
    }

    //Configure YoutubeMp3Downloader with your settings
    var YD = new this.youtubeMp3Downloader({
      "ffmpegPath": this.pathToFfmpeg,                          // Where is the FFmpeg binary located?
      "outputPath": directory,                                  // Where should the downloaded and encoded files be stored?
      "youtubeVideoQuality": "highest",                         // What video quality should be used?
      "queueParallelism": 2,                                    // How many parallel downloads/encodes should be started?
      "progressTimeout": 2000                                   // How long should be the interval of the progress reports
    });

    //Download video and save as MP3 file
    YD.download(videoCode as string);

    return Observable.create(
      (observer: Observer<any>) => {
        YD.on("finished", (err, data: DownLoadFinished) => {
          observer.next(data);
          observer.complete();
        });

        YD.on("error", (error) => {
          observer.error(error);
        });

        YD.on("progress", (progress: DownloadProgress) => {
          observer.next(progress);
        });
      }
    )
  }

  private getVideoCode(url): string | boolean {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return false;
    }
  }
}
