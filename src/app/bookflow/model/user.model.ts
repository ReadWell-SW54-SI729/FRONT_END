export class User {
  id: string;
  firstName: any;
  lastName: any;
  age: any;
  email: any;
  description: any;
  bookFavorites: any;
  constructor(id: string, firstName: any, lastName: any, age: any,email:any, description: any, bookFavorites: any) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
    this.description = description;
    this.bookFavorites = bookFavorites;
  }
}
