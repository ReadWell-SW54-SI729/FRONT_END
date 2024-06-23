export class SignInResponse {

  public id: number;
  public email: string;
  public token: string;

  constructor(id: number, email: string, token: string) {
    this.token = token;
    this.email = email;
    this.id = id;
  }

}
