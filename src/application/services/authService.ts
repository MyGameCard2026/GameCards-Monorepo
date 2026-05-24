import { userRepository } from '@gamecards/data';
import type { User } from '../models/User';

export const authService = {
  login: async (username: string, password: string):Promise<User | null> => {
    // Simulamos un retardo de red
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = userRepository.findUserByUsername(username);
        if (user && user.password === password) {
          resolve({ id: user.id, username: user.username });
        } else {
          resolve(null);
        }
      }, 500);
    });
  }
};
