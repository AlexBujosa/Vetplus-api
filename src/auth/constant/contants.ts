import { SignUpInput } from '../graphql/inputs/sign-up.input';

export enum SignUpResult {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
}

export enum SignUpMessage {
  USER_CREATED = 'USER_CREATED',
  USER_IN_PENDING = 'USER_IN_PENDING',
  USER_FAILED = 'USER_FAILED',
}

export type SignUpVerificationCodeType = {
  signUpInput: SignUpInput;
  password: number;
};

export type SignUpVerificationResult = {
  signUpInput: SignUpInput;
  result: boolean;
};
