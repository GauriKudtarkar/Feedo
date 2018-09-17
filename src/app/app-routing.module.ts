import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment, UrlSegmentGroup, Route } from '@angular/router';
import { FeedDetailsComponent } from './feed-details/feed-details.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { FeedNotFound404Component } from './feed-not-found404/feed-not-found404.component';


export function FeedDetailsUrlMatcher(segments: UrlSegment[], group: UrlSegmentGroup, route: Route) {
  return segments.length === 5 &&
    segments[0].path === "r" &&
    segments[2].path === "comments" ? ({ consumed: segments }) : null;
}

const routes: Routes = [
  { path: 'feedList', component: FeedListComponent },
  { path: 'self', component: FeedListComponent },
  { path: 'error/:msg', component: FeedNotFound404Component },
  { path: 'error', component: FeedNotFound404Component },
  { path: '', component: FeedListComponent },
  { matcher: FeedDetailsUrlMatcher, component: FeedDetailsComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})


export class AppRoutingModule {

}

