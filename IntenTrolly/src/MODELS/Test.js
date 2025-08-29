import { sequelize } from "@/DATABASE/DB_CONNECTION";
import { DataTypes } from "sequelize";

const TestSchema = sequelize.define(
    'Test',
    {
        testName: {type: DataTypes.STRING},
        testID: {type: DataTypes.INTEGER}
    }
);

export default TestSchema; 