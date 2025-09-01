export function authorizeRole(user, allowedRoles = []) {
  if (!allowedRoles.includes(user.role)) {
    return false;
  }
  return true;
}
