import { CreatedUserResponse } from '@/user/graphql/types/created-user-response.type';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignUpResponse extends CreatedUserResponse {}
