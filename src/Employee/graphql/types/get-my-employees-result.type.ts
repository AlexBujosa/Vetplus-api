import { ObjectType, Field } from '@nestjs/graphql';
import { GetMyEmployee } from './get-my-employees.type';

@ObjectType()
export class GetMyEmployeesResult {
  @Field(() => [GetMyEmployee], { nullable: true })
  ClinicEmployees: GetMyEmployee[];
}
