import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const gqlExecutionContext = GqlExecutionContext.create(context);
    const ctx = gqlExecutionContext.getContext();
    const request = ctx.req;

    const { role } = request.user;
    if (!roles.includes(role)) return false;

    return true;
  }
}
