import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { Person } from './entities/person.entity';
import { CreatePersonInput } from './dto/create-person.input';
import { CreatePersonResponse } from './entities/createPersonResponse.entity';

// import { UpdatePersonInput } from './dto/update-person.input';

@Resolver(() => Person)
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  @Mutation(() => CreatePersonResponse)
  createPerson(
    @Args('createPersonInput') createPersonInput: CreatePersonInput,
  ) {
    return this.personService.create(createPersonInput);
  }

  @Query(() => Person)
  findPersonById(person_id: string) {
    return this.personService.findById(person_id);
  }

  @Query(() => [Person])
  findAll() {
    return this.personService.findAll();
  }

  // @Query(() => Person, { name: 'person' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.personService.findOne(id);
  // }

  // @Mutation(() => Person)
  // updatePerson(@Args('updatePersonInput') updatePersonInput: UpdatePersonInput) {
  //   return this.personService.update(updatePersonInput.id, updatePersonInput);
  // }

  // @Mutation(() => Person)
  // removePerson(@Args('id', { type: () => Int }) id: number) {
  //   return this.personService.remove(id);
  // }
}
