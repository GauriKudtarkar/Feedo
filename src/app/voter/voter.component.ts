import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.css']
})
export class VoterComponent implements OnInit {
  @Input() score: number
  score_holder: number | null = null;
  isExpanded: boolean = true;
  private isUpvoteClicked=false;
  private isDownvoteClicked=false;

  constructor() { }

  ngOnInit() {
    this.score_holder=this.score;
  }

  onUpVoteClick(): void {
    this.isDownvoteClicked=false;
    this.isUpvoteClicked=!this.isUpvoteClicked;
    this.score=this.score?this.score:0;
    if (this.isUpvoteClicked) {
      this.score_holder = this.score + 1;
    }
    else {
      this.score_holder = this.score;
    }
  }

  onDownVoteClick(): void {
    this.isUpvoteClicked=false;
    this.isDownvoteClicked=!this.isDownvoteClicked;
    this.score=this.score?this.score:0;
    debugger;
    if (this.isDownvoteClicked) {
      this.score_holder = this.score - 1;
    }
    else {
      this.score_holder = this.score;
    }
  }

}
