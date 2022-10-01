import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class AdminRoleGuard implements CanActivate {
    canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        console.log(request.session);

        if(request.user){
            const {userId} = request.user;
            console.log(userId);

            return true;
        }

        return false;
    }

}