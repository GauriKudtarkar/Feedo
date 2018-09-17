import { Component, OnInit, Input } from '@angular/core';
import { Feed } from '../Models/Feed';
import { FeedsService } from '../Services/feeds.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input("comments") comments: Feed[] = null;

  constructor(private feedClient: FeedsService) { }

  ngOnInit() {
  }

  public GetRelativeTime(date): string {
    return this.feedClient.GetRelativeTime(date);
  }

  public HtmlDecode(text: string) {
    return this.feedClient.HtmlDecode(text);
  }
}
