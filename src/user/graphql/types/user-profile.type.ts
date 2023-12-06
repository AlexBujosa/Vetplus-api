import { UserFmc } from '@/appoinment/graphql/types/user-fmc.type';
import { User } from './user.type';
import { Field, ObjectType } from '@nestjs/graphql';
import { VeterinarianSpecialties } from '@/Employee/graphql/types/veterinarian-specialties.type';

@ObjectType()
export class UserProfile extends User {
  @Field(() => UserFmc, { nullable: true })
  User_Fmc: UserFmc;

  @Field(() => VeterinarianSpecialties, { nullable: true })
  VeterinariaSpecialties: VeterinarianSpecialties;
}
