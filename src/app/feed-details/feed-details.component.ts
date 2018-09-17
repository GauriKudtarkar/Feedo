import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeedsService } from '../Services/feeds.service';
import { Feed } from '../Models/Feed';

@Component({
  selector: 'app-feed-details',
  templateUrl: './feed-details.component.html',
  styleUrls: ['./feed-details.component.css']
})
export class FeedDetailsComponent implements OnInit, OnDestroy {
  private sub: any;
  feed: Feed;
  isLoading: boolean = true;
 
  constructor(private feedClient: FeedsService) { }

  ngOnInit() {

    this.feedClient.loading$.subscribe(flag =>{
      this.isLoading = flag;
    });

    this.sub= this.feedClient.LoadFeedDetails().subscribe(feed => {
      this.feed = feed;
      console.log(feed);
    });
  }

  public GetRelativeTime(date):string{
    return this.feedClient.GetRelativeTime(date);
  }

  public HtmlDecode(text:string):string{
    return this.feedClient.HtmlDecode(text);
  }
  
  ngOnDestroy() {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

}
