import { sequelize } from "@/DATABASE/DB_CONNECTION";
import { DataTypes } from "sequelize";

const ProductSchema = sequelize.define(
    "Product",
    {
        product_ID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        Product_Name: { type: DataTypes.STRING, allowNull: false },
        Category: {
            type: DataTypes.ENUM(
                "Fruits & Vegetables",
                "Oils & Fats",
                "Dairy",
                "Grains & Pulses",
                "Seafood",
                "Bakery",
                "Beverages"
            ),
            allowNull: false
        },
        Unit_Price: { type: DataTypes.INTEGER, allowNull: false },
        Expiration_Date: { type: DataTypes.STRING },
        Status: {
            type: DataTypes.ENUM("Discontinued", "Backordered", "Active"),
            defaultValue: "Active"
        },
    }
);

export default ProductSchema;
