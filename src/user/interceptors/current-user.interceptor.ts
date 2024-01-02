import { NestInterceptor, ExecutionContext, Injectable, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "../user.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService: UserService) {}

    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<any> {
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session || {};

        if (userId) {
            const user = this.userService.getUserById(userId)
            request.currentUser = user;
        }

        return handler.handle()
    }
}

