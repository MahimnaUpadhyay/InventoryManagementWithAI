import ProductSchema from "./Product.js";
import SupplierSchema from "./Supplier.js";
import StockSchema from "./Stock.js";
import SalesSchema from "./Sales.js";
import WarehouseSchema from "./Warehouse.js";

// Supplier ↔ Product
ProductSchema.belongsTo(SupplierSchema, { foreignKey: "supplier_ID", as: "Supplier" });
SupplierSchema.hasMany(ProductSchema, { foreignKey: "supplier_ID", as: "Products" });

// Product ↔ Stock (1:1)
StockSchema.belongsTo(ProductSchema, { foreignKey: "product_ID", as: "product" });
ProductSchema.hasOne(StockSchema, { foreignKey: "stock_ID", as: "stock" });

// Product ↔ Sales (1:M)
SalesSchema.belongsTo(ProductSchema, { foreignKey: "product_ID", as: "product" });
ProductSchema.hasMany(SalesSchema, { foreignKey: "sales_ID", as: "sales" });

// Product ↔ Warehouse (M:N)
ProductSchema.belongsToMany(WarehouseSchema, { through: "WarehouseProduct", foreignKey: "product_ID", as: "warehouses" });
WarehouseSchema.belongsToMany(ProductSchema, { through: "WarehouseProduct", foreignKey: "warehouse_ID", as: "products" });

export {
  ProductSchema,
  SupplierSchema,
  StockSchema,
  SalesSchema,
  WarehouseSchema
};
