import { Exclude } from "class-transformer";

export class User {
    id: string;
    first_name: string;
    last_name: string;
    avatar: string;
    nickname: string;
    email: string;
    changed_by: string;
    created_at: any;
    updated_at: any;

    @Exclude()
    password: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
