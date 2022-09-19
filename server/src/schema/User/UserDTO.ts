import { IsEmail, Length } from 'class-validator';
import { Field, ObjectType, ID, InputType } from 'type-graphql';

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

@InputType()
export class RegisterUserInput {
  @Field({ nullable: false })
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(6, 30)
  password: string;

  @Field()
  @Length(6, 30)
  confirmPassword: string;
}

export default User;

// CLASS VALIDATORS
