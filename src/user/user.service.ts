import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    async getAllUser(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async getUserById(id): Promise<User> {
        if (!id) {
            return null
        }
        const user = this.userModel.findOne({ where: { id } });

        if (!user) {
            throw new BadRequestException('No user found!')
        }

        return user;
    }

    async createUser(body) {
        const user = await this.userModel.create(body);
        return user;
    }

    // async updateUser(id: number, body: Partial<UserModel>): Promise<UserModel> {
    //     const user = await this.userModel.findOne({ where: { id } });

    //     if (!user) {
    //         throw new BadRequestException('Invalid request.')
    //     }

    //     Object.assign(user, body);
    //     return this.userModel.update({ user: body })
    // }

    async deleteUser(id: number) {
        const user = await this.userModel.findOne({where: {id}});

        if (user) {
            throw new NotFoundException('User does not exists.');
        }

        return this.userModel.destroy({ where: {id} });
    }
}