import { Feed } from '../Models/Feed';

export class FeedList {
    constructor(
        public Subredit: string = "sweden",
        public Limit: number = 10,
        public After?: string,
        public Before?: string,
        public Feeds?: Feed[],
        public Reason:string='',
        public Message:string='',
        public error:string='') { }
}

export class Pagination {
    constructor(
        public After?: string,
        public Before?: string,
     ) { }
}
