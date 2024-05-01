export class Book {
  id: any;
  genre:any;
  name:any;
  img:any;
  description:any;
  author:any;
  authorImage:any;
  publisher:any;
  bookUrl:any;

  constructor(id:any,name:any,genre:any, img:any, description:any, author:any, authorImage:any, publisher:any, bookUrl:any) {
    this.id=id;
    this.name = name;
    this.genre = genre;
    this.img = img;
    this.description = description;
    this.author = author;
    this.authorImage = authorImage;
    this.publisher = publisher;
    this.bookUrl = bookUrl;
  }

}
