// note in order for graphql server to start, we need a root resolves

import { Mutation, Query, Resolver } from 'type-graphql';
import User from './UserDTO';

@Resolver(() => User)
class UserResolver {
  @Mutation(() => User)
  async register() {
    try {
        // create a user

        
    } catch (error) {
        
    }
  }
}

export default UserResolver;
