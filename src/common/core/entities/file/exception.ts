import { ERROR_CODES } from "../../../constant/errors";
import { CommonException } from "../../../constant/exceptions";

export class FileException extends CommonException {

  static NotFound(data) {
    return new FileException(ERROR_CODES.FILE + 1, 'file not found', data);
  }

  static NotEnoughPermission(data: any = null) {
    return new FileException(ERROR_CODES.FILE + 2, 'Not enough permissions to access', data);
  }

  public static InvalidUploadType(data: any = null) {
    return new CommonException(ERROR_CODES.FILE + 2, 'Invalid upload type', data);
  }

}