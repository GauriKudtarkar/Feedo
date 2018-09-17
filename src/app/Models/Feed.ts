import { Thumbnail } from "./Thumbnail";
import { Author } from "./Author";

export class Feed {
    constructor(public AuthorDetails: Author,
        public Title: string,
        public Name:string,
        public Thumbnail: Thumbnail,
        public Num_comments: number,
        public Score: number,
        public Created: number,
        public Permalink:string,
        public UrlForJson:string,
        public Text?:string,//self text
        public Replies?:Feed[]
    ){}
} 
