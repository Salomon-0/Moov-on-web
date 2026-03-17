const USER_ROLES = {
    ADMIN: 'admin',
    COMPANY_MANAGER: 'general_manager',
    TOURIST: 'tourist',
  };
  
  
  const roleHierarchy = {
    [USER_ROLES.ADMIN]: [USER_ROLES.ADMIN],
    [USER_ROLES.COMPANY_MANAGER]: [USER_ROLES.COMPANY_MANAGER, USER_ROLES.ADMIN],
    [USER_ROLES.TOURIST]: [USER_ROLES.TOURIST, USER_ROLES.ADMIN],
  };
  
  const checkRole = (
    currentRole: string,
    excludeRoleHierarchy = false,
    rolesToCheck: string[]
  ) => {
    // Si aucun rôle à vérifier n'est fourni, retourner false
    if (!rolesToCheck) return false;
  
    const safeRequiredRoles = Array.isArray(rolesToCheck)
      ? rolesToCheck
      : [rolesToCheck];
  
    if (excludeRoleHierarchy) return safeRequiredRoles.includes(currentRole);
  
    return safeRequiredRoles.some(
      (requiredRole) =>
        // Vérifier si requiredRole existe dans roleHierarchy avant d'appeler .includes()
        roleHierarchy[requiredRole] &&
        roleHierarchy[requiredRole].includes(currentRole)
    );
  };
  
  export { checkRole };
  export default USER_ROLES;