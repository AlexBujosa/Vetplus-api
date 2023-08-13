import { ObjectType } from '@nestjs/graphql';
import { AddPetResponse } from './add-pet-response.type';
@ObjectType()
export class DeletePetResponse extends AddPetResponse {}
