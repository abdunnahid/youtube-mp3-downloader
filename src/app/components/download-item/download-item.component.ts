import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { YoutubeVideoToDownload } from '../add-url/add-url.component';
import { DownloadService } from '../../core/services/download.service';
import { isValidYoutubeVideoUrl } from '../../shared/youtube-video-url-validator';
import { ToastService } from '../../shared/toast';
import { DownloadProgress, DownLoadFinished } from '../../models';

@Component({
  selector: 'download-item',
  templateUrl: './download-item.component.html',
  styleUrls: ['./download-item.component.scss']
})
export class DownloadItemComponent implements OnInit {

  @Input() video: YoutubeVideoToDownload;
  @Output() removed: EventEmitter<void> = new EventEmitter<void>();
  downloading: boolean;
  downloadedPercentage = 0;

  constructor(
    private _toast: ToastService,
    private _downloader: DownloadService,
  ) { }

  ngOnInit(): void {
  }


  downlaod(url: string, directory: string): void {

    if (!isValidYoutubeVideoUrl(url)) {
      this._toast.showWarningToast('Not a valid youtube url!', 10000);
      return;
    }

    if (!directory) {
      this._toast.showWarningToast('No path to save specified!', 10000);
      return;
    }
    this.downloading = true;

    this._downloader.download(url, directory)
      .subscribe(
        (progress: DownloadProgress) => {
          this.downloadedPercentage = progress?.progress?.percentage;
          console.log("HomeComponent -> downlaod -> progress", progress)
        },
        (error) => {
          console.log("HomeComponent -> downlaod -> error", error)
        },
        () => {
          this.downloading = false;
          this.video.hasDownloaded = true;
          console.log("HomeComponent -> downlaod -> complete")
        }
      )
  }

  remove(): void {
    this.removed.emit();
  }

}
