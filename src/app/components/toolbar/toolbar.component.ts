import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../core/services';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private _electron: ElectronService
  ) { }

  ngOnInit(): void {
  }

  addUrl(): void {
    
  }
  
  minimize(): void {
    if (!this._electron.isElectron) {
      return;
    }
    this._electron.remote.getCurrentWindow().minimize();
  }

  close(): void {
    if (!this._electron.isElectron) {
      return;
    }
    this._electron.remote.getCurrentWindow().close();
  }

}
