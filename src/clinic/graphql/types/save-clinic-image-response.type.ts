import { SaveImageResponse } from '@/global/graphql/types/save-image-response.type';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SaveClinicImageResponse extends SaveImageResponse {}
