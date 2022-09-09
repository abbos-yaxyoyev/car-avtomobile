import { ERROR_CODES } from './errors';

export class CommonException {
  constructor(public code: number, public message: string, public data: any) { }
  public static UnknownError(data?: any) {
    return new CommonException(ERROR_CODES.BASE, 'Unknown error', data);
  }

  public static ValidationError(data?: any) {
    return new CommonException(ERROR_CODES.BASE + 1, 'Validation Error', data);
  }

  static AllreadyExist(data?, message?,) {
    return new CommonException(ERROR_CODES.BASE, `collectionName:    already exist , message: ${message}`, data);
  }
}


export class EmployeeException extends CommonException {

  static AllreadyExist(data) {
    return new EmployeeException(ERROR_CODES.EMPLOYEE, 'user exist', data);
  }

  static NotFound(data) {
    return new EmployeeException(ERROR_CODES.EMPLOYEE + 1, 'user not found', data);
  }

  static Blocked(block_time) {
    return new EmployeeException(
      ERROR_CODES.EMPLOYEE + 2,
      `block ${block_time / 60} minutes`,
      'you have made too many attempts ',
    );
  }

  static NotEnoughPermission(data: any = null) {
    return new EmployeeException(ERROR_CODES.EMPLOYEE + 3, 'Not enough permissions to access', data);
  }

}
