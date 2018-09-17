import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { FeedsService } from './Services/feeds.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { FeedDetailsComponent } from './feed-details/feed-details.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { SearchComponent } from './search/search.component';
import { CommentsComponent } from './comments/comments.component';
import { VoterComponent } from './voter/voter.component';
import { FeedNotFound404Component } from './feed-not-found404/feed-not-found404.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedDetailsComponent,
    FeedListComponent,
    SearchComponent,
    CommentsComponent,
    VoterComponent,
    FeedNotFound404Component,
    CommentComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [FeedsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
