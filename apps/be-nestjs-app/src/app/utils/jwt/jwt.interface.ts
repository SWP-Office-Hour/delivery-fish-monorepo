import { UserRole } from '@delivery-fish-monorepo/contract';

export interface JwtPayload {
  user_id: string;
  role: UserRole;
}
