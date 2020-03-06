import { Component, OnInit } from '@angular/core';
import { DownloadService } from '../core/services/download.service';
import { FileService } from '../core/services/file.service';
import { UserSettingsService, UserSettings } from '../core/services/user-settings.service';
import { ToastService } from '../shared/toast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userSettings: UserSettings;

  constructor(
    private _downloader: DownloadService,
    private _fileService: FileService,
    private _userSettings: UserSettingsService,
    private _toast: ToastService
  ) { }

  ngOnInit(): void {
    this.userSettings = this._userSettings.settings;
  }

  chooseFileLocation(): void {
    const pathToSave = this._fileService.selectDirectory();
    if (pathToSave) {
      this.userSettings = { pathToSave: pathToSave }
      this._userSettings.settings = { pathToSave: pathToSave };
    }
  }

  downlaod(url: string): void {

    if (!this.isValidYouTubeUrl(url)) {
      this._toast.showWarningToast('Not a valid youtube url!', 10000);
      return;
    }

    if (!this._userSettings.settings.pathToSave) {
      this._toast.showWarningToast('No path to save specified!', 10000);
      return;
    }

    this._downloader.download(url)
      .subscribe(
        (progress) => {
          console.log("HomeComponent -> downlaod -> progress", progress)
        },
        (error) => {
          console.log("HomeComponent -> downlaod -> error", error)
        },
        () => {
          console.log("HomeComponent -> downlaod -> complete")
        }
      )
  }

  private isValidYouTubeUrl(url: string): boolean {
    var url = url;
    if (url != undefined || url != '') {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[2].length == 11) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

}
