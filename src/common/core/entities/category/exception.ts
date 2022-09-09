import { ERROR_CODES } from "../../../constant/errors";
import { CommonException } from "../../../constant/exceptions";

export class CategoryException extends CommonException {

  static NotFound(data) {
    return new CategoryException(ERROR_CODES.CAR + 1, 'category not found', data);
  }

  static NotEnoughPermission(data: any = null) {
    return new CategoryException(ERROR_CODES.CAR + 2, 'Not enough permissions to access', data);
  }

}