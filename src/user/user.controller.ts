import { Body, Controller, Delete, Get, Param, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserResponseDto } from './dtos/user-info.dto';
import { UserService } from './user.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from './user.model';
import { AuthGuard } from 'src/guards/auth.guards';


@Controller('user')
@ApiTags('user')
@Serialize(UserResponseDto)
export class UserController {
    constructor(private userService: UserService, private authService: AuthService) {}

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User) {        
        return user;
    }

    @Post('signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @Post('/signup')    
    async createUser(@Body() body: CreateUserDto, @Session() session) {
        const user = await this.authService.signup(body);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')    
    async signIn(@Body() req: any, @Session() session) {        
        console.log('CHK-1', req, req.body);
        const { email, password } = req;               
        const user = await this.authService.signin(email, password);
        console.log('USR', user);
        session.userId = user.id;
        return user;   
    }

    @Get()
    async getAllUser() {
        return this.userService.getAllUser();
    }

    @Get('/:id')
    async getUserById(@Param('id') id: number) {
        return this.userService.getUserById(id);
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: number) {
        
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: number) {
        return this.userService.deleteUser(id);
    }
}
