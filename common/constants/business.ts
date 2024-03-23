import { UserRole } from '../enums/enums.db'

export const PRICE_PER_SQUAREFOOT = {
  SINGLE: 6,
  DOUBLE: 8,
}

export const UserRoleLabel = {
  [UserRole.Admin]: 'Admin',
  [UserRole.Staff]: 'Staff',
  [UserRole.Customer]: 'Customer',
}
