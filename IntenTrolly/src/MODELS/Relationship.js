import ProductSchema from "./Product.js";
import SupplierSchema from "./Supplier.js";
import StockSchema from "./Stock.js";
import SalesSchema from "./Sales.js";
import UserSchema from "./User.js";
import NormalizeTable from "./MainTable.js";

// Supplier ↔ Product
ProductSchema.belongsTo(SupplierSchema, { foreignKey: "supplier_ID", as: "Supplier" });
SupplierSchema.hasMany(ProductSchema, { foreignKey: "supplier_ID", as: "Products" });

// Product ↔ Stock (1:1)
StockSchema.belongsTo(ProductSchema, { foreignKey: "product_ID", as: "product" });
ProductSchema.hasOne(StockSchema, { foreignKey: "product_ID", as: "stock" });

// Product ↔ Sales (1:M)
SalesSchema.belongsTo(ProductSchema, { foreignKey: "product_ID", as: "product" });
ProductSchema.hasMany(SalesSchema, { foreignKey: "product_ID", as: "sales" });

// Normalize Table (acts as junction)
NormalizeTable.belongsTo(SupplierSchema, { foreignKey: "supplier_ID", as: "Supplier" });
NormalizeTable.belongsTo(ProductSchema, { foreignKey: "product_ID", as: "Product" });
NormalizeTable.belongsTo(SalesSchema, { foreignKey: "sales_ID", as: "Sales" });
NormalizeTable.belongsTo(StockSchema, { foreignKey: "stock_ID", as: "Stock" });
NormalizeTable.belongsTo(UserSchema, { foreignKey: "user_ID", as: "User" });

export {
  ProductSchema,
  SupplierSchema,
  StockSchema,
  SalesSchema,
  NormalizeTable
};
