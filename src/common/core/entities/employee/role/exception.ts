import { ERROR_CODES } from "../../../../constant/errors";
import { CommonException } from "../../../../constant/exceptions";

export class RoleException extends CommonException {

  static NotFound(data) {
    return new RoleException(ERROR_CODES.ROLE + 1, 'role not found', data);
  }

  static NotEnoughPermission(data: any = null) {
    return new RoleException(ERROR_CODES.ROLE + 2, 'Not enough permissions to access', data);
  }

}