import { ERROR_CODES } from "../../../constant/errors";
import { CommonException } from "../../../constant/exceptions";

export class CarException extends CommonException {

  static NotFound(data) {
    return new CarException(ERROR_CODES.CAR + 1, 'car not found', data);
  }

  static NotEnoughPermission(data: any = null) {
    return new CarException(ERROR_CODES.CAR + 2, 'Not enough permissions to access', data);
  }

}