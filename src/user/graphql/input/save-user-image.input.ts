import { InputType, Field } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';

@InputType()
export class SaveUserImageInput {
  @Field(() => GraphQLUpload)
  image: Upload;
}
