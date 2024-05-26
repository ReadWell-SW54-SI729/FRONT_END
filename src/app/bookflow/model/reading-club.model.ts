export class ReadingClub {
  id: any;
  name:any;
  meetingDate:any;
  bookIsbn:any;
  description:any;
  users: any[]= [] ;

  constructor(id:any,name:any,meetingDate:any, bookIsbn:any, description:any, users:any) {
    this.id=id;
    this.name = name;
    this.meetingDate = meetingDate;
    this.bookIsbn = bookIsbn;
    this.description = description;
    this.users = users;
  }
}
