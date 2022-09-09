import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { RequestGenericInterface } from 'fastify';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JWT_REFRESH_TOKEN_SECRET_KEY',
      // Pass token to `req`
      passReqToCallback: true,
    });
  }

  async validate(req: RequestGenericInterface, payload: any) {
    const refresh_token = req.Headers['Authorization'].replace('Bearer', '').trim();
    return {
      ...payload,
      refresh_token,
    };
  }
}