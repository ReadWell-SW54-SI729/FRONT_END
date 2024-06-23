export class SignUpResponse {

  public id: number;
  public email: string;

  constructor(id: number, email: string) {
    this.email = email;
    this.id = id;
  }
}
