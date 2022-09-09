import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  id: number;
  phone_number: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JWT_ACCESS_TOKEN_SECRET_KEY',
    });
  }

  async validate(payload: JwtPayload) {

    console.log("AccessTokenStrategy payload: ", payload);

    return payload;

  }
}