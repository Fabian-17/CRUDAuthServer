import { getAllUsers,
    createUser,
    updateUser, 
    deleteUser,
    getUserById } from "../models/User.js";



// Controller to get all users
export const ctrlGetAllUsers = async (req, res) => {
    try {
      const users = await getAllUsers()
  
      if (!users) {
        return res.sendStatus(404)
      }
  
      res.status(200).json(users)
    } catch (error) {
      console.log(error)
      res.status(500).json('Unexpected error')
    }
};


// Controller to get a single user by ID
export const ctrlGetUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const oneUser = await getUserById(userId)
  
      if (!oneUser) {
        return res.sendStatus(404)
      }
  
      res.status(200).json(oneUser)
    } catch (error) {
      console.log(error)
      res.status(500).json('Unexpected error')
    }
};


// Controller to create a new user
export const ctrlCreateUser = async (req, res) => {
    try {
      const user = await createUser(req.body)
      res.status(201).json(user)
    } catch (error) {
      console.log(error)
      res.status(500).json('Unexpected error')
    }
};


// Controller to delete a user by ID
export const ctrlDeleteUser = async (req, res) => {
    try {
        const deletedUser = await deleteUser(req.params.id);
        
        if (!deletedUser) {
            return res.sendStatus(404);
        }
        
        res.status(200).json(deletedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json('Unexpected error');
    }
};


// Controller to update a user's information by ID
export const ctrlUpdateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await updateUser(userId, req.body);

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json('Unexpected error');
  }
};