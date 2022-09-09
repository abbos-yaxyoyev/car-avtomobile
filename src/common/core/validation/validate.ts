import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CommonException } from '../../constant/exceptions';


export const validateIt = async <T>(data: any, classType: ClassConstructor<T>, groups: any): Promise<T> => {
  if (!data) {
    throw CommonException.ValidationError('Request body should be object');
  }

  const classData = plainToClass(classType, data as T, {
    excludeExtraneousValues: false,
  });

  const errors = await validate(classData as any, { groups, whitelist: true });

  if (!errors || errors.length === 0) return classData;

  throw CommonException.ValidationError(errors);
};

@Injectable()
export class MyValidationPipe<T> implements PipeTransform<any> {

  constructor(private groups: string[],) { }

  async transform(requestBody: any, { metatype }: ArgumentMetadata): Promise<T> {

    console.log('requestBody: ', requestBody);
    console.log('metatype: ', metatype);

    if (!metatype || !this.toValidate(metatype)) {
      return requestBody;
    }

    if (!requestBody) {
      throw CommonException.ValidationError('Request body should be object');
    }

    const classData = plainToClass(metatype, requestBody as T, {
      excludeExtraneousValues: false,
      groups: this.groups,
    });

    const errors = await validate(classData as any, { groups: this.groups, whitelist: true });

    console.log("classData: ", classData);
    if (!errors || errors.length === 0) return classData;

    console.log("errors: ", errors);
    throw CommonException.ValidationError(errors);
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}