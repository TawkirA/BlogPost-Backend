import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './user.model';
import { UserService } from './user.service';

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(@InjectModel(User) private userModel: typeof User, private userService: UserService) {}

    async signup(userInfo: any) {
        const { email, name, password } = userInfo;
        const user = await this.userModel.findAll({ where: { email } });

        if (user.length) {
            throw new BadRequestException('Email already exists.')
        }

        // Hash the password and save following below steps.
        // 1. Generate a salt
        const salt = randomBytes(8).toString('hex');
        
        // 2. Hash the salt and password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // 3. Join the hashed result and salt together
        const result = salt + '.' + hash.toString('hex');

        const userDetails = {
            name,
            email,
            password: result
        }

        // 4. Create new user and save
        const createdUser = await this.userService.createUser(userDetails);

        return createdUser;
    }

    async signin(email: string, password: string) {        
        const user = await this.userModel.findOne({ where: {email}})

        if (!user) {
           throw new NotFoundException('User not found.');                
        }

        const [salt, storedHash] = await user.password.split('.');

        const hash = (await scrypt(password, salt, 32) as Buffer);

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('email or password is wrong');
        }

        return user;
    }
}
