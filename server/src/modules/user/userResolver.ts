import { Query, Resolver } from 'type-graphql';
import { User } from './userDto';

@Resolver(() => User)
class UserResolver {
  @Query(() => User)
  user() {
    return {
      id: '12',
      email: '3234343',
      username: 'username',
    };
  }
}

export default UserResolver;
