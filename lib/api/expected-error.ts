export class ExpectedError {
  public content: string | object;
  public errorCode: number;
  constructor(content: string | object, errorCode = 500) {
    this.content = content;
    this.errorCode = errorCode;
  }
}
