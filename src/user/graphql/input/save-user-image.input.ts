import { SaveImageInput } from '@/global/graphql/input/save-image-input.input';
import { InputType } from '@nestjs/graphql';
@InputType()
export class SaveUserImageInput extends SaveImageInput {}
