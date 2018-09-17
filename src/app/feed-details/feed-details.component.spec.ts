import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VoterComponent } from '../voter/voter.component';
import { FeedDetailsComponent } from './feed-details.component';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule}  from '@angular/router/testing';
import { CommentsComponent } from '../comments/comments.component';
import { CommentComponent } from '../comment/comment.component';
describe('FeedDetailsComponent', () => {
  let component: FeedDetailsComponent;
  let fixture: ComponentFixture<FeedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,RouterTestingModule],
      declarations: [ FeedDetailsComponent,VoterComponent,CommentsComponent,CommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
