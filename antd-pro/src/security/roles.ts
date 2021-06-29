class Roles {
  static readonly values = {
    Admin: 'admin',
  };

  static readonly publicRoles = [Roles.values.Admin];

  static isPublicRole(role: string) {
    return Roles.publicRoles.includes(role);
  }
}

export default Roles;
