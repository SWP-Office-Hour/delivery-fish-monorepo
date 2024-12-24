import { UserRole } from '../../users/models/user.entity';

export interface JwtPayload {
  user_id: string;
  role: UserRole;
}
