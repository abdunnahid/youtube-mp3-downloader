import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ValidateYoutubeVideoUrl } from '../../shared/youtube-video-url-validator';
import { ToastService } from '../../shared/toast';
import { FileService } from '../../core/services/file.service';

export interface YoutubeVideoToDownload {
  url: string;
  directory: string;
  hasDownloaded: boolean;
}

@Component({
  selector: 'app-add-url',
  templateUrl: './add-url.component.html',
  styleUrls: ['./add-url.component.scss']
})
export class AddUrlComponent {

  @ViewChild('directoryInput') directoryInput: ElementRef;

  url = new FormControl('https://www.youtube.com/watch?v=hwP7WQkmECE', [Validators.required, ValidateYoutubeVideoUrl]);
  pathToSave = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<AddUrlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toast: ToastService,
    private _fileService: FileService,
  ) { }

  chooseFileLocation(): void {
    const pathToSave = this._fileService.selectDirectory();
    this.pathToSave.setValue(pathToSave);
    this.directoryInput.nativeElement.blur();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ok(): void {
    if (this.url.invalid) {
      this.url.markAllAsTouched();
      this._toast.showWarningToast('Not a valid youtube video url!', 10000);
      return;
    }
    else if (this.pathToSave.invalid) {
      this.url.markAllAsTouched();
      this._toast.showWarningToast('No path to save specified!', 10000);
      return;
    }

    const youtubeVideoToDownload: YoutubeVideoToDownload = {
      url: this.url.value,
      directory: this.pathToSave.value,
      hasDownloaded: false
    }

    this.dialogRef.close(youtubeVideoToDownload);
  }

}
