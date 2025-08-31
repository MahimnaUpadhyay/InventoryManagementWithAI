import { sequelize } from "@/DATABASE/DB_CONNECTION";
import { DataTypes } from "sequelize";

const SalesSchema = sequelize.define("Sales", {
  sales_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Sales_Volume: { type: DataTypes.INTEGER, allowNull: false }
});

export default SalesSchema;
