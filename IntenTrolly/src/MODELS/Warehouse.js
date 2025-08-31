import { sequelize } from "@/DATABASE/DB_CONNECTION";
import { DataTypes } from "sequelize";

const WarehouseSchema = sequelize.define(
    'Warehouse',
    {
        Warehouse_ID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        Warehouse: {type: DataTypes.STRING},
        Warehouse_Phone_NO: {type: DataTypes.STRING}
    }
);

export default WarehouseSchema;
