import { async, ComponentFixture, TestBed,fakeAsync,tick } from '@angular/core/testing';
import {Router} from "@angular/router";
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import {RouterTestingModule,} from '@angular/router/testing'
import { HttpClientModule } from '@angular/common/http';

describe('HeaderComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let router: Router;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,RouterTestingModule,HttpClientModule],
      declarations: [ SearchComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });

  // it('should return data', () => {
  //   component.subredit = "sweden";
  //   component.onKey("13");
  //   expect((component.sub)).toEqual(1);
  // })

  // it('should not return data', () => {
  //   component.subredit = " ";
  //   component.onKey("13");
  //   expect((component.sub)).toEqual(1);
  // })

  // it('navigate to "" redirects you to /home', fakeAsync(() => { 
  //   router.navigate(['']); 
  //   tick(); 
  //   expect(location.pathname).toBe('/home'); 
  // }));
});
