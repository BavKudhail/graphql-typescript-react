// note in order for graphql server to start, we need a root resolves

import { Query, Resolver } from 'type-graphql';
import User from './UserDTO';

@Resolver(() => User)
class UserResolver {
  @Query(() => User)
  user() {
    return {
      id: '21343232',
      email: 'username@email.com',
      username: 'username',
    };
  }
}

export default UserResolver;
