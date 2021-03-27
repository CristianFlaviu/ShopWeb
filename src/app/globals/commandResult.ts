export class CommandResult<T> {
  public payload: T;
  public isSuccess: boolean;
  public errorMessage: string;
}
