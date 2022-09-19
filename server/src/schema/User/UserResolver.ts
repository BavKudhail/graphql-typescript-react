// note in order for graphql server to start, we need a root resolves

import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import User, { RegisterUserInput } from './UserDTO';
import { createUser } from './UserService';

@Resolver(() => User)
class UserResolver {
  @Mutation(() => User)
  async register(@Arg('input') input: RegisterUserInput) {
    try {
      const user = await createUser(input);
      return user;
    } catch (error) {
      // check if the user already exists
      throw error;
    }
  }

  @Query(() => User)
  async me(@Ctx() context) {
    try {
      // grab the user from contex
      return context.user;
    } catch (error) {}
  }
}

export default UserResolver;
