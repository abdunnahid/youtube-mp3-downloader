import { Injectable } from '@angular/core';
import { ElectronService } from './electron/electron.service';
import { Dialog } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private dialog: Dialog;

  constructor(
    private _electron: ElectronService
  ) {
    if (this._electron.isElectron) {
      this.dialog = this._electron.dialog;
    }
  }

  public selectDirectory(): string {
    const directory = this.dialog.showOpenDialogSync(
      {
        title: "Select a folder",
        properties: ['openDirectory']
      }
    )
    if (directory) {
      return directory[0];
    }
  }
}
