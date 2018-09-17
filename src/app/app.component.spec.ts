import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {SearchComponent} from './search/search.component'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule,FormsModule,HttpClientModule,RouterTestingModule],
      declarations: [
        AppComponent,
        SearchComponent,
        
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
