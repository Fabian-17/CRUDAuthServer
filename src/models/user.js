import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';
import { hashPassword } from '../helpers/hash.js';
import bcrypt from 'bcrypt';

// Enum defining user roles
export const ROLES = {
    ADMIN: 'admin',
    USER: 'user'
};


// Database modeling for the User entity
export const UserModel = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM(ROLES.ADMIN, ROLES.USER),
      defaultValue: ROLES.ADMIN
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: 'User'
});

// Retrieves all users from the database
export async function getAllUsers() {
  try {
    const users = await UserModel.findAll();

    if (!users || users.length === 0) {
      return 'No users were found in the database.';
    };

    return users;
  } catch (error) {
    return ('Error while fetching all users');
  }
};


// Creates a new user in the database
export async function createUser(userToCreate) {
  try {
    const existingUser = await UserModel.findOne({ where: { email: userToCreate.email } });
    if (existingUser) {
      return ('User already exists');
    }

    const hashedPassword = await hashPassword(userToCreate.password);
    const newUser = await UserModel.create({ ...userToCreate, password: hashedPassword });
    return newUser;
  } catch (error) {
    return ('Error while creating user');
  }
};


// Retrieves a single user by ID from the database
export async function getUserById(userId) {
  try {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      return ('User not found');
    }
    return user;
  } catch (error) {
    return ('Error while fetching user by ID');
  }
};


// Deletes a user from the database
export async function deleteUser(id) {
  try {
    const deletedCount = await UserModel.destroy({ where: { id } });
    if (!deletedCount) {
      return ('User not found for deletion');
    }
    return 'User deleted successfully';
  } catch (error) {
    return ('Error while deleting user');
  }
};


// Updates user information in the database
export async function updateUser(userId, updatedUserData) {
  try {
    if (updatedUserData.password) {
      const hashedPassword = await hashPassword(updatedUserData.password);
      updatedUserData.password = hashedPassword;
    };

    const [updatedCount] = await UserModel.update(updatedUserData, {
      where: { id: userId },
    });

    if (updatedCount === 0) {
      return null;
    };

    const updatedUser = await getUserById(userId);

    return updatedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
  

// Checks if a user with the given email and password exists in the database
export async function getUserByEmailAndPassword({ email, password }) {
  try {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  } catch (error) {
    return ('Error while fetching user by email and password');
  }
};