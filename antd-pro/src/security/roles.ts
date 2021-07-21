class Roles {
  static readonly values = {
    SA: 'sa',
    Finance: 'finance',
    Admin: 'admin',
    Sales: 'sales',
    Operation: 'operation',
    Producer: 'producer',
    WarehouseAdmin: 'warehouse_admin',
    WarehouseManager: 'warehouse_manager',
  };

  static readonly publicRoles = [
    Roles.values.Admin,
    Roles.values.Finance,
    Roles.values.Operation,
    Roles.values.Sales,
    Roles.values.WarehouseAdmin,
    Roles.values.WarehouseManager,
  ];

  static isPublicRole(role: string) {
    return Roles.publicRoles.includes(role);
  }
}

export default Roles;
