import { sequelize } from "@/DATABASE/DB_CONNECTION";
import { DataTypes } from "sequelize";

const NormalizeTable = sequelize.define(
    "NormalizeTable",
    {
        NID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
    }
);

export default NormalizeTable;