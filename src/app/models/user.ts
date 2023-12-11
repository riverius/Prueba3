import { User } from "@firebase/auth";
export interface ExtendedUser extends User {
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    role: string;
}