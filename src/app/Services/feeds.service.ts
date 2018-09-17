import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { FeedList, Pagination, } from '../Models/FeedList';
import { map, filter, catchError, finalize } from 'rxjs/operators';
import { Feed } from '../Models/Feed';
import { Thumbnail } from '../Models/Thumbnail';
import { Author } from '../Models/Author';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  private feedList = new BehaviorSubject<FeedList>(null);
  private feedDetails = new BehaviorSubject<Feed>(null);
  private firstFeed = new BehaviorSubject<string>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  FetchFeeds(subredit = 'sweden' as string,
    limit: number = 10,
    before: string = null,
    after: string = null): Observable<FeedList> {
    this.loadingSubject.next(true);
    return this.http.get<FeedList>("https://www.reddit.com/r/" + subredit + ".json",
      {
        params: new HttpParams()
          .set('limit', limit.toString())
          .set('before', before)
          .set('after', after)
      })
      .pipe(
        map(response => {
          var _feedList = {} as FeedList;
          var feeds = [] as Feed[];

          if (response) {

            if (response['data'] && response['data']['children']) {

              response['data']['children'].forEach(_feed => {
                feeds.push(this.LoopThroughFeedHierarchy(_feed));
              });

              _feedList = new FeedList(
                subredit,
                limit,
                response['data']['after'],
                response['data']['before'],
                feeds);
            }
          }
          return _feedList
        }),
        catchError(this.handleFeedNotFoundError),
        finalize(() => this.loadingSubject.next(false)));
  }

  private handleFeedNotFoundError(errorResponse: HttpErrorResponse) {
    if (errorResponse.status === 404) {
      return throwError("Oops!No feeds found!!!");
    }
    else {
      return throwError("Oopss! Service is down....Please try again later")
    }
  }
  LoopThroughFeedHierarchy(_feed: any): Feed {
    var author: Author;
    var thumbnail: Thumbnail;
    var mainFeed: Feed;
    var subfeeds = [] as Feed[];

    if (_feed) {

      author = new Author(_feed['data']['author'], _feed['data']['author_flair_text']);
      thumbnail = new Thumbnail(this.GetProfilePic(_feed['data']['thumbnail']),
        _feed['data']['thumbnail_width'],
        _feed['data']['thumbnail_height']);

      //check if feed has any replies then keep pushing them in subfeeds
      if (_feed['data']['replies'] &&
        _feed['data']['replies']['data']['children'] &&
        _feed['data']['replies']['data']['children'].constructor === Array &&
        _feed['data']['replies']['data']['children']['length'] > 0) {

        _feed['data']['replies']['data']['children'].forEach(comment => {
          subfeeds.push(this.LoopThroughFeedHierarchy(comment));
        });
      }
      mainFeed = new Feed(author,
        _feed['data']['title'],
        _feed['data']['name'],
        thumbnail,
        _feed['data']['num_comments'],
        _feed['data']['score'],
        _feed['data']['created'],
        _feed['data']['permalink'],
        _feed['data']['permalink'] ? "https://www.reddit.com" + _feed['data']['permalink'] + ".json" : null,
        this.GetFeedText(_feed),
        subfeeds);
    }
    return mainFeed;
  }
  GetProfilePic(thumbnailUrl: string): string {
    if (thumbnailUrl && thumbnailUrl != "self")
      return thumbnailUrl;
    else
      return "../../assets/no_profile.png";
  }

  FetchFeedDetails(urlForJson): Observable<Feed> {
    this.loadingSubject.next(true);
    return this.http.get<Feed>(urlForJson)
      .pipe(
        map(response => {
          var mainFeed = {} as Feed;

          if (response && response.constructor === Array && response['length'] > 0) {
            //for main entry
            if (response[0]['data']['children']['length'] === 1) {
              mainFeed = this.LoopThroughFeedHierarchy(response[0]['data']['children'][0]);
            }

            if (!mainFeed.Replies) {
              mainFeed.Replies = [];
            }

            //for comments entry 
            if (response['length'] == 2) {
              response[1]['data']['children'].forEach(comment => {
                mainFeed.Replies.push(this.LoopThroughFeedHierarchy(comment));
              });
            }
          }
          return mainFeed;
        }),
        catchError(this.handleFeedNotFoundError),
        finalize(() => this.loadingSubject.next(false)));
  }

  private GetFeedText(feed: Feed) {
    if (feed['data']['selftext_html']) {
      return feed['data']['selftext_html'];
    }
    else if (feed['data']['body_html']) {
      return feed['data']['body_html'];
    }
    else {
      return '';
    }
  }

  //this will publish the latest feedlist value
  PublishFeeds(feedList: FeedList) {
    this.feedList.next(feedList);
  }

  //Load freshly published feedlist
  LoadFeeds() {
    return this.feedList.asObservable().pipe(
      filter(feedlist => !!feedlist)
    );
  }

  //publish selected Feed details
  PublishFeedDetails(feed: Feed) {
    this.feedDetails.next(feed);
  }

  //load selected feed details
  LoadFeedDetails() {
    return this.feedDetails.asObservable().pipe(
      filter(feed => !!feed)
    );
  }

  //publish the latest pagination details
  PublishFirstFeedName(feedName: string) {
    this.firstFeed.next(feedName);
  }

  //load the latest pagination details
  LoadFirstFeedName() {
    return this.firstFeed.asObservable();
  }

  //Get Relative Time
  public GetRelativeTime(date): string {
    return moment(date * 1000).fromNow(true) + " ago";
  }

  public HtmlDecode(input) {
    if (input) {
      var e = document.createElement('div');
      e.innerHTML = input;
      return e.childNodes[0].nodeValue;
    }
    else
      return '';
  }
}




