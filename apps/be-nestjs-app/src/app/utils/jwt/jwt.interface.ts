import { UserRole } from 'src/users/models/user.entity';

export interface JwtPayload {
  user_id: string;
  role: UserRole;
}
