import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VoterComponent } from '../voter/voter.component';
import { Feed } from '../Models/Feed';
import { Author } from '../Models/Author';
import { Thumbnail } from '../Models/Thumbnail';
import { CommentComponent } from './comment.component';
import { HttpClientModule } from '@angular/common/http';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent ,VoterComponent],
        imports:[HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    var author = new Author('test','test');
    var thumbnail= new Thumbnail('test',1,2);
    
    component.comment = new Feed(author,'test','test',thumbnail,1,1,1,'test','test','test',null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
