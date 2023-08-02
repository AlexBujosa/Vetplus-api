import { CustomError } from '../error/custom-error';

export enum CustomErrorResult {
  EMAIL_ALREADY_EXIST = 'EMAIL_ALREADY_EXIST',
  PASSWORD_WEAK = 'PASSWORD_WEAK',
  TRANSACTION_FAILED = 'TRANSACTION_FAILED',
  FAILED_CREATE_CREDENTIALS = 'FAILED_CREATE_CREDENTIALS',
}

export const customError = {
  EMAIL_ALREADY_EXIST: () =>
    new CustomError(CustomErrorResult.EMAIL_ALREADY_EXIST),
  PASSWORD_WEAK: () => new CustomError(CustomErrorResult.PASSWORD_WEAK),
  FAILED_CREATE_CREDENTIALS: () =>
    new CustomError(CustomErrorResult.FAILED_CREATE_CREDENTIALS),
};

export enum CreateUserResult {
  FAILED = 'FAILED',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export enum CreationStatus {
  USER_CREATED = 'USER_CREATED',
  USER_IN_PENDING = 'USER_IN_PENDING',
}
