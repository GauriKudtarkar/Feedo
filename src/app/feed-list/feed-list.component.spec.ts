import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedListComponent } from './feed-list.component';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule}  from '@angular/router/testing';
import { CommentsComponent } from '../comments/comments.component';
describe('FeedListComponent', () => {
  let component: FeedListComponent;
  let fixture: ComponentFixture<FeedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,RouterTestingModule],
      declarations: [ FeedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
