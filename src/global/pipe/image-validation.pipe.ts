import { AddPetInput } from '@/pet/graphql/input/add-pet.input';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class ImageValidationPipe implements PipeTransform {
  transform(value: AddPetInput, metadata: ArgumentMetadata) {
    console.log(value);
    return value;
  }
}
