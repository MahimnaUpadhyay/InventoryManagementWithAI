import { sequelize } from "@/DATABASE/DB_CONNECTION";
import { DataTypes } from "sequelize";

const SupplierSchema = sequelize.define(
    'Supplier',
    {
        supplier_ID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        supplierName: {type: DataTypes.STRING},
        supplierPhone: {type: DataTypes.INTEGER},
        supplierAddress: {type: DataTypes.STRING},
        supplierRate: {type: DataTypes.INTEGER}
    }
);

export default SupplierSchema;