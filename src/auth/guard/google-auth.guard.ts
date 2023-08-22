import { GoogleAuthService } from '@/auth/google-auth/google-auth.service';
import { UserService } from '@/user/user.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TokenPayload } from 'google-auth-library';
import { Observable } from 'rxjs';

@Injectable()
export class GoogleAuthGuard implements CanActivate {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly userService: UserService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const authorizationHeader = request.headers['authorization'];
    const token = authorizationHeader.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException();
    }

    if (context.getArgs()[3].fieldName === 'googleLogin') {
      const result = this.validateToken(token)
        .then((result) => {
          return this.userService.findByEmail(result.email);
        })
        .then((user) => {
          if (!user) return false;
          request.user = user;

          return true;
        });
      return result;
    } else {
      const result = this.validateToken(token).then((result) => {
        request.user = result;
        if (!result) return false;
        return true;
      });
      return result;
    }
  }

  private async validateToken(token: string): Promise<TokenPayload> {
    const tokenPayload = await this.googleAuthService.verifyIdToken(token);
    return tokenPayload;
  }
}
