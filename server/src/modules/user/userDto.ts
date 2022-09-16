import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  // field defines what goes into graphql schema
  @Field(() => ID, { nullable: false })
  id: string;

  @Field(() => ID, { nullable: false })
  username: string;

  @Field(() => ID, { nullable: false })
  email: string;

  password: string;
}
