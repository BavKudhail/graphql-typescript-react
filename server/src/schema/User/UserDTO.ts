import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
class User {
  @Field(() => ID, { nullable: false })
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  password: string;
}

export default User;
