import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { EmployeeException } from '../../../../constant/exceptions';
import { IDataServices } from '../../../../core/abstract/data.servise.abstract';
import { EmployeeEntity } from '../../../../core/entities/employee/employee.entity';
import { IEmployeeAuthRepository, ILogin, Tokens } from './interface';

export class EmployeeAuthRepository implements IEmployeeAuthRepository<EmployeeEntity>{

  constructor(

    private dataServices: IDataServices,

    private jwtService: JwtService

  ) {
  }


  public async createEmployee(data: EmployeeEntity): Promise<EmployeeEntity> {

    data.password = await this.generateArgonHash(data.password)

    const result = await this.dataServices.employee.insertOne(data);

    return result;

  }

  public async login(password: string, phoneNumber: string): Promise<ILogin> {

    password = await this.generateArgonHash(password)

    const employee = await this.dataServices.employee.findOne({ isDeleted: false, phoneNumber, password });

    if (!employee) throw EmployeeException.NotFound(phoneNumber);

    const tokens: Tokens = await this.generateTokens(employee._id, employee.phoneNumber);

    await this.dataServices.employee.updateById(employee._id, { refreshToken: tokens.refreshToken });

    return {
      tokens,
      employee: {
        _id: employee._id,
        fullName: employee.fullName,
        phoneNumber: employee.phoneNumber,
        biography: employee.biography,
        birthday: employee.birthday,
        createdAt: employee.createdAt
      }
    };

  }

  public async refreshToken(id: string, refreshToken: string): Promise<Tokens> {

    const employee = await this.dataServices.employee.findById(id);

    if (!employee || !employee.refreshToken) throw new Error('Access Denied');

    const refreshTokenMatches = await argon2.verify(
      employee.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) throw new Error('Access Denied');

    const tokens: Tokens = await this.generateTokens(employee._id, employee.phoneNumber);

    await this.dataServices.employee.updateById(id, { refreshToken: tokens.refreshToken });

    return tokens;

  }

  public async logout(id: string): Promise<string> {
    const result = await this.dataServices.employee.updateById(id, { refreshToken: null })
    return result._id;
  }


  /* --- Utility Functions --- */
  private async generateArgonHash(data: string): Promise<string> {
    return await argon2.hash(data);
  }

  private async generateTokens(id: number, phoneNumber: string): Promise<{ accessToken: string, refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          _id: id,
          phoneNumber,
        },
        {
          secret: 'JWT_ACCESS_TOKEN_SECRET_KEY',
          expiresIn: 5 * 60,
        },
      ),
      this.jwtService.signAsync(
        {
          _id: id,
          phoneNumber,
        },
        {
          secret: 'JWT_REFRESH_TOKEN_SECRET_KEY',
          expiresIn: 24 * 60 * 60,
        },
      ),
    ]);

    return {
      refreshToken,
      accessToken,
    };

  }

}
