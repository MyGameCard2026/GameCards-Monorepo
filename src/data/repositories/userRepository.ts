import users from '../json/users.json';

export const userRepository = {
  findUserByUsername: (username: string) => {
    return users.find(user => user.username === username);
  },
  getUserById: (id: string) => {
    return users.find(user => user.id === id);
  }
};
