import { sequelize } from "@/DATABASE/DB_CONNECTION";
import { DataTypes } from "sequelize";

const StockSchema = sequelize.define("Stock", {
  stock_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Stock_Quantity: { type: DataTypes.INTEGER, allowNull: false },
  Order_Date: { type: DataTypes.STRING },
  Last_Order_Date: { type: DataTypes.STRING },
});

export default StockSchema;
