export class ReadingClub {
  clubId: any;
  clubName:any;
  meetingDate:any;
  bookId:any;
  clubDescription:any;
  userId: any[]= [] ;

  constructor(clubId:any, clubName:any, meetingDate:any, bookId:any, clubDescription:any, userId:any[] ) {
    this.clubId=clubId;
    this.clubName = clubName;
    this.meetingDate = meetingDate;
    this.bookId = bookId;
    this.clubDescription = clubDescription;
    this.userId = userId;
  }
}
