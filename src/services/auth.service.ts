import { User } from '../entities/User.entity';
import { hash, compare } from 'bcryptjs';
import { dbConfig } from '../configs/dbConfig';
import { Gender } from '../enums';

export class AuthService {

  async registerUser(firstname: string, lastname: string, gender: Gender, email: string, password: string): Promise<User | null> {

    const userRepository = dbConfig.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return null;
    }

    const hashedPassword = await hash(password, 10);

    const newUser = userRepository.create({ firstname, lastname, gender, email, password: hashedPassword });
    await userRepository.save(newUser);

    return newUser;
  }

  async loginUser(email: string, password: string): Promise<User | null> {
    const userRepository = dbConfig.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (user && (await compare(password, user.password))) {
      return user;
    }

    return null;
  }
}
