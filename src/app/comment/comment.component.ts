import { Component, OnInit, Input } from '@angular/core';
import { Feed } from '../Models/Feed';
import { FeedsService } from '../Services/feeds.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Feed = null;

  score_holder: number | null = null;
  isExpanded: boolean = true;
  private isUpvoteClicked=false;
  private isDownvoteClicked=false;
  
  constructor(private feedClient: FeedsService) { }

  ngOnInit() {
    this.score_holder = this.comment.Score?this.comment.Score:0;
  }

  public GetRelativeTime(date): string {
    return this.feedClient.GetRelativeTime(date);
  }

  public HtmlDecode(text: string) {
    return this.feedClient.HtmlDecode(text);
  }

  onUpVoteClick(): void {
    this.isDownvoteClicked=false;
    this.isUpvoteClicked=!this.isUpvoteClicked;
    this.comment.Score=this.comment.Score?this.comment.Score:0;
    if (this.isUpvoteClicked) {
      this.score_holder = this.comment.Score + 1;
    }
    else {
      this.score_holder = this.comment.Score;
    }
  }

  onDownVoteClick(): void {
    this.isUpvoteClicked=false;
    this.isDownvoteClicked=!this.isDownvoteClicked;
    this.comment.Score=this.comment.Score?this.comment.Score:0;
    debugger;
    if (this.isDownvoteClicked) {
      this.score_holder = this.comment.Score - 1;
    }
    else {
      this.score_holder = this.comment.Score;
    }
  }

  onExpandCollapse() {
    this.isExpanded = !this.isExpanded;
  }

}
