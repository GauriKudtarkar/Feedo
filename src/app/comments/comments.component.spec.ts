import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsComponent } from './comments.component';
import { VoterComponent } from '../voter/voter.component';
import { FeedListComponent } from '../feed-list/feed-list.component';
import { FeedDetailsComponent } from '../feed-details/feed-details.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule}  from '@angular/router/testing';
import { Feed } from '../Models/Feed';
import { Author } from '../Models/Author';
import { Thumbnail } from '../Models/Thumbnail';
import { CommentComponent } from '../comment/comment.component';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterComponent,FeedListComponent,
                      FeedDetailsComponent,CommentComponent,CommentsComponent],
        imports:[HttpClientModule,
                        RouterTestingModule,FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    var author = new Author('test','test');
    var thumbnail= new Thumbnail('test',1,2);
    
    component.comments = [new Feed(author,'test','test',thumbnail,1,1,1,'test','test','test',null)];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
