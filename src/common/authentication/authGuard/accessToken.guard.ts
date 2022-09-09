import {
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ATGuard extends AuthGuard('jwt-access') {

  constructor(private str: string) {
    super()
  }

  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {

      console.log('this.str: ', err);
      console.log('handleRequest error: ', this.str);
      console.log('handleRequest info: ', info);

      throw err || new UnauthorizedException();
    }
    return user;
  }
}