import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeedList, Pagination } from '../Models/FeedList';
import { Feed } from '../Models/Feed';
import { FeedsService } from '../Services/feeds.service';
import { Router } from "@angular/router";

@Component({
  selector: 'feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit, OnDestroy {
  private sub: any;
  feedList: FeedList = new FeedList('sweden', 10, null, null, null);
  dataSource: Feed[];
  isGoingForward: boolean = null;
  first_feed_name: string = null;
  isNextEnabled: boolean = null;
  isPreviousEnabled: boolean = null;
  moveAhead: boolean = null;
  isLoading: boolean = true;

  constructor(private router: Router, private feedClient: FeedsService) { }

  public ngOnInit() {
    this.feedClient.loading$.subscribe(flag =>{
      this.isLoading = flag;
    });
    this.feedClient.LoadFirstFeedName().subscribe(feedName => {
      this.first_feed_name = feedName;
    });

    this.feedClient.LoadFeeds().subscribe(feedList => {
      this.feedList = feedList;

      this.dataSource = feedList.Feeds;

      if (feedList.Feeds && feedList.Feeds.length > 0) {
        this.feedList.Before = feedList.Feeds[0].Name;
        if (!this.first_feed_name) {
          this.feedClient.PublishFirstFeedName(feedList.Feeds[0].Name);
        }
      }
      else {
        this.feedList.Before = null;
        this.first_feed_name = null;
      }

      //enable / disable previous button
      if (this.feedList.Before === this.first_feed_name) {
        this.isPreviousEnabled = false;
      }
      else {
        this.isPreviousEnabled = true;
      }

      //whenever user will click on previous button,  assign value to after field
      if (this.moveAhead === false && feedList.Feeds && feedList.Feeds.length > 0) {
        this.feedList.After = feedList.Feeds[feedList.Feeds.length - 1].Name;
      }

      //enable/disable next button
      if (this.feedList.After) {
        this.isNextEnabled = true;
      }
      else {
        this.isNextEnabled = false;
      }
    });
  }

  public FetchFeedDetails(pathUrl, UrlForJson) {
    this.sub = this.feedClient.FetchFeedDetails(UrlForJson).subscribe(res => {
      this.feedClient.PublishFeedDetails(res);
      this.router.navigate([pathUrl]);
    },
      (error) => {
        this.feedClient.PublishFeedDetails(null);
        this.router.navigate([pathUrl]);
      });
  }

  public ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public GetRelativeTime(date): string {
    return this.feedClient.GetRelativeTime(date);
  }

  public changePage(moveAhead: boolean) {
    this.moveAhead = moveAhead;
    if (moveAhead && this.isNextEnabled) {
      this.FetchFeeds(this.feedList.Subredit,
        this.feedList.Limit,
        null,
        this.feedList.After);
    }
    else if (this.isPreviousEnabled) {
      this.FetchFeeds(this.feedList.Subredit,
        this.feedList.Limit,
        this.feedList.Before,
        null);
    }
    else {
      return false;
    }
  }

  public FetchFeeds(subredit: string, limit: number, before: string, after: string) {
    this.sub = this.feedClient.FetchFeeds(subredit, limit, before, after).subscribe(feedList => {
      //after fetching data from subredit, publish it 
      this.feedClient.PublishFeeds(feedList);

      this.router.navigate(['']);
    },
      (error) => {
        this.router.navigate(['error']);
      });
  }

  public changeLimit(limit: number) {
    this.feedList.Limit = limit;
    this.FetchFeeds(this.feedList.Subredit,
      this.feedList.Limit,
      null,
      null);
  }
}
