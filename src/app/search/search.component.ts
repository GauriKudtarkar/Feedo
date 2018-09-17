import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeedsService } from '../Services/feeds.service';
import { Router } from '@angular/router';
import { FeedList } from '../Models/FeedList';
import { Input } from '@angular/core';
@Component({
  selector: 'searchBar',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() feedList: FeedList = null;
  private sub: any;
  public subredit = 'sweden' as string;

  constructor(private router: Router, private feedClient: FeedsService) { }

  ngOnInit() {
    //by default get sweden subredit's data
    if (!this.feedList) {
      this.onKey("13");
    }
  }

  onKey(keyCode: string) {
    if (keyCode == "13") {
      this.feedClient.PublishFirstFeedName(null);
      this.sub = this.feedClient.FetchFeeds(this.subredit, 10).subscribe(feedList => {
        //after fetching data from subredit, publish it 
        this.feedClient.PublishFeeds(feedList);

        this.router.navigate(['']);
      },
        error => {
          this.router.navigateByUrl('/error');
        });
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
