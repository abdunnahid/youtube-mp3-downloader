import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUrlComponent, YoutubeVideoToDownload } from '../components/add-url/add-url.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // https://www.youtube.com/watch?v=hwP7WQkmECE

  videos: YoutubeVideoToDownload[] = [];

  constructor(
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  addUrl(): void {
    const dialogRef = this._dialog.open(AddUrlComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe((result: YoutubeVideoToDownload) => {
      if (result) {
        this.videos.push(result);
      }
    });
  }

  remove(index: number): void {
    this.videos.splice(index, 1);
  }

}
