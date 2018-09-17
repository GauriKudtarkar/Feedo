import { Component, OnInit } from '@angular/core';
import { FeedList } from './Models/FeedList';
import { FeedsService } from './Services/feeds.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  feedList: FeedList = null;

  constructor(private feedClient: FeedsService) { }
  ngOnInit() {
    this.feedClient.LoadFeeds().subscribe(feedList => {
      this.feedList = feedList;
    });

  }
}
