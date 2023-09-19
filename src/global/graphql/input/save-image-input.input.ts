import { InputType, Field } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';

@InputType()
export class SaveImageInput {
  @Field(() => GraphQLUpload)
  image: Upload;

  @Field({ nullable: true })
  old_image: string;
}
