import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response {
  code: number;
  message: string;
  data: any;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response> {

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response | any> {

    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    console.log('response.body: ', response.body);

    return next.handle().pipe(

      map((data) => {

        return {
          code: 0,
          message: 'Success',
          data
        }

      })

    );

  }
}