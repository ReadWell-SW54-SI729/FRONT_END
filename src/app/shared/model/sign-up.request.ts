export class SignUpRequest {

  public firstName: string;
  public lastName: string;
  public username: string;
  public password: string;

  constructor(firstName: string, lastName:string, email: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.username = email;
  }

}
