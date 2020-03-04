import { Component, OnInit } from '@angular/core';
import { DownloadService } from '../core/services/download.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _downloader: DownloadService
  ) { }

  ngOnInit(): void { }

  downlaod(): void {
    this._downloader.download();
  }

}
