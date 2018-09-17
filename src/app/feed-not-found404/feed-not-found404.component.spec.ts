import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedNotFound404Component } from './feed-not-found404.component';

describe('FeedNotFoundund404Component', () => {
  let component: FeedNotFound404Component;
  let fixture: ComponentFixture<FeedNotFound404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedNotFound404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedNotFound404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
