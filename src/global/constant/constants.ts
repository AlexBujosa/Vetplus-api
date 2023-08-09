import { CustomException } from '../exception/custom.exception';

export enum SignUpCustomExceptionMessage {
  EMAIL_EXIST = 'EMAIL_EXIST',
  PASSWORD_WEAK = 'PASSWORD_WEAK',
  TRANSACTION_FAILED = 'TRANSACTION_FAILED',
  FAILED_CREATE_CREDENTIALS = 'FAILED_CREATE_CREDENTIALS',
}

const {
  EMAIL_EXIST,
  PASSWORD_WEAK,
  FAILED_CREATE_CREDENTIALS,
  TRANSACTION_FAILED,
} = SignUpCustomExceptionMessage;

export const signUpCustomException = {
  EMAIL_ALREADY_EXIST: () => new CustomException(EMAIL_EXIST, 200),
  PASSWORD_WEAK: () => new CustomException(PASSWORD_WEAK, 200),
  FAILED_CREATE_CREDENTIALS: () =>
    new CustomException(FAILED_CREATE_CREDENTIALS, 200),
  TRANSACTION_FAILED: () => new CustomException(TRANSACTION_FAILED, 200),
};

export enum SignInCustomExceptionMessage {
  WRONG_PROVIDER = 'WRONG_PROVIDER',
}

const { WRONG_PROVIDER } = SignInCustomExceptionMessage;

export const signInCustomException = {
  WRONG_PROVIDER: () => new CustomException(WRONG_PROVIDER, 200),
};

export enum CustomExceptionMessage {
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  CREDENTIALS_NOT_FOUND = 'CREDENTIALS_NOT_FOUND',
  SOMETHING_WRONG_FIND_EMAIL = 'SOMETHING_WRONG_TRYING_TO_FIND_EMAIL',
  SOMETHING_WRONG_FIND_CREDENTIALS = 'SOMETHING_WRONG_TRYING_TO_FIND_CREDENTIALS',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_TOKEN = 'INVALID_TOKEN',
}

const {
  EMAIL_NOT_FOUND,
  CREDENTIALS_NOT_FOUND,
  SOMETHING_WRONG_FIND_EMAIL,
  SOMETHING_WRONG_FIND_CREDENTIALS,
  FORBIDDEN,
  INVALID_TOKEN,
} = CustomExceptionMessage;

export const customException = {
  EMAIL_NOT_FOUND: () => new CustomException(EMAIL_NOT_FOUND, 200),
  CREDENTIALS_NOT_FOUND: () => new CustomException(CREDENTIALS_NOT_FOUND, 200),
  SOMETHING_WRONG_FIND_EMAIL: () =>
    new CustomException(SOMETHING_WRONG_FIND_EMAIL, 200),
  SOMETHING_WRONG_FIND_CREDENTIALS: () =>
    new CustomException(SOMETHING_WRONG_FIND_CREDENTIALS, 200),
  FORBIDDEN: () => new CustomException(FORBIDDEN, 200),
  INVALID_TOKEN: () => new CustomException(INVALID_TOKEN, 200),
};
