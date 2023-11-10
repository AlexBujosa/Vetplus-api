import { HttpExceptionOptions } from '@nestjs/common';
import { CustomException } from '../exception/custom.exception';

export enum Status {
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export type ImageUploadFolder = 'pets' | 'users' | 'clinics';

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
  EMAIL_ALREADY_EXIST: (options: HttpExceptionOptions) =>
    new CustomException(EMAIL_EXIST, 200, options),
  PASSWORD_WEAK: (options: HttpExceptionOptions) =>
    new CustomException(PASSWORD_WEAK, 200, options),
  FAILED_CREATE_CREDENTIALS: (options: HttpExceptionOptions) =>
    new CustomException(FAILED_CREATE_CREDENTIALS, 200, options),
  TRANSACTION_FAILED: (options: HttpExceptionOptions) =>
    new CustomException(TRANSACTION_FAILED, 200, options),
};

export enum SignInCustomExceptionMessage {
  WRONG_PROVIDER = 'WRONG_PROVIDER',
}

const { WRONG_PROVIDER } = SignInCustomExceptionMessage;

export const signInCustomException = {
  WRONG_PROVIDER: (options: HttpExceptionOptions) =>
    new CustomException(WRONG_PROVIDER, 200, options),
};

export enum CustomExceptionMessage {
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  CREDENTIALS_NOT_FOUND = 'CREDENTIALS_NOT_FOUND',
  SOMETHING_WRONG_FIND_EMAIL = 'SOMETHING_WRONG_TRYING_TO_FIND_EMAIL',
  SOMETHING_WRONG_FIND_CREDENTIALS = 'SOMETHING_WRONG_TRYING_TO_FIND_CREDENTIALS',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_TOKEN = 'INVALID_TOKEN',
  INVALID_FILE_TYPE = 'INVALID_FILE_TYPE',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  VALIDATION_FAILED = 'VALIDATION_FIELDS_FAIL',
  UPDATE_USER_FAIL = 'UPDATE_USER_FAIL',
  ALREADY_HAVE_CLINIC = 'ALREADY_HAVE_CLINIC',
  HANDLE_EMPLOYEE_REQUEST_FAILED = 'HANDLE_EMPLOYEE_REQUEST_FAILED',
  CREATION_CLINIC_FAILED = 'CREATION_CLINIC_FAILED',
  SCORE_VETERINARIAN_FAILED = 'SCORE_VETERINARIAN_FAILED',
  INVITATION_FAILED = 'INVITATION_FAILED',
  NOTIFICATION_FAILED = 'NOTIFICATION_FAILED',
  APPOINTMENT_RESUMEN_FAILED = 'PPOINTMENT_RESUMEN_FAILED',
}

const {
  EMAIL_NOT_FOUND,
  CREDENTIALS_NOT_FOUND,
  SOMETHING_WRONG_FIND_EMAIL,
  SOMETHING_WRONG_FIND_CREDENTIALS,
  FORBIDDEN,
  INVALID_TOKEN,
  INVALID_FILE_TYPE,
  INVALID_CREDENTIALS,
  VALIDATION_FAILED,
  UPDATE_USER_FAIL,
  ALREADY_HAVE_CLINIC,
  HANDLE_EMPLOYEE_REQUEST_FAILED,
  CREATION_CLINIC_FAILED,
  SCORE_VETERINARIAN_FAILED,
  INVITATION_FAILED,
  NOTIFICATION_FAILED,
  APPOINTMENT_RESUMEN_FAILED,
} = CustomExceptionMessage;

export const customException = {
  EMAIL_NOT_FOUND: (options: HttpExceptionOptions) =>
    new CustomException(EMAIL_NOT_FOUND, 200, options),
  CREDENTIALS_NOT_FOUND: (options: HttpExceptionOptions) =>
    new CustomException(CREDENTIALS_NOT_FOUND, 200, options),
  SOMETHING_WRONG_FIND_EMAIL: (options: HttpExceptionOptions) =>
    new CustomException(SOMETHING_WRONG_FIND_EMAIL, 200, options),
  SOMETHING_WRONG_FIND_CREDENTIALS: (options: HttpExceptionOptions) =>
    new CustomException(SOMETHING_WRONG_FIND_CREDENTIALS, 200, options),
  FORBIDDEN: (options: HttpExceptionOptions) =>
    new CustomException(FORBIDDEN, 200, options),
  INVALID_TOKEN: (options: HttpExceptionOptions) =>
    new CustomException(INVALID_TOKEN, 200, options),
  INVALID_FILE_TYPE: (options: HttpExceptionOptions) =>
    new CustomException(INVALID_FILE_TYPE, 200, options),
  INVALID_CREDENTIALS: (options: HttpExceptionOptions) =>
    new CustomException(INVALID_CREDENTIALS, 200, options),
  VALIDATION_FAILED: (options: HttpExceptionOptions) =>
    new CustomException(VALIDATION_FAILED, 200, options),
  UPDATE_USER_FAIL: (options: HttpExceptionOptions) =>
    new CustomException(UPDATE_USER_FAIL, 200, options),
  ALREADY_HAVE_CLINIC: (options: HttpExceptionOptions) =>
    new CustomException(ALREADY_HAVE_CLINIC, 200, options),
  HANDLE_EMPLOYEE_REQUEST_FAILED: (options: HttpExceptionOptions) =>
    new CustomException(HANDLE_EMPLOYEE_REQUEST_FAILED, 200, options),
  CREATION_CLINIC_FAILED: (options: HttpExceptionOptions) =>
    new CustomException(CREATION_CLINIC_FAILED, 200, options),
  SCORE_VETERINARIAN_FAILED: (options: HttpExceptionOptions) =>
    new CustomException(SCORE_VETERINARIAN_FAILED, 200, options),
  INVITATION_FAILED: (options: HttpExceptionOptions) =>
    new CustomException(INVITATION_FAILED, 200, options),
  NOTIFICATION_FAILED: (options: HttpExceptionOptions) =>
    new CustomException(NOTIFICATION_FAILED, 200, options),
  APPOINTMENT_RESUMEN_FAILED: (options: HttpExceptionOptions) =>
    new CustomException(APPOINTMENT_RESUMEN_FAILED, 200, options),
};

export type SummaryScore = {
  _count: number;
  _sum: {
    points: number;
  };
};
