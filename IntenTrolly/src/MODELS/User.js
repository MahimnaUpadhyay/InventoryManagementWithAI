import { sequelize } from "@/DATABASE/DB_CONNECTION";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

const UserSchema = sequelize.define(
  "User",
  {
    user_ID: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    User_Name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    User_Email: { 
      type: DataTypes.STRING, 
      unique: true, 
      allowNull: false,
      validate: { isEmail: true }
    },
    User_Password: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    User_Role: { 
      type: DataTypes.ENUM("Admin", "Manager", "Employee"), 
      allowNull: false, 
      defaultValue: "Employee" 
    },
  },
  {
    hooks: {
      // Hash password before saving
      beforeCreate: async (user) => {
        if (user.User_Password) {
          const salt = await bcrypt.genSalt(10);
          user.User_Password = await bcrypt.hash(user.User_Password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("User_Password")) {
          const salt = await bcrypt.genSalt(10);
          user.User_Password = await bcrypt.hash(user.User_Password, salt);
        }
      },
    },
  }
);

// Instance method to validate password
UserSchema.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.User_Password);
};

export default UserSchema;
