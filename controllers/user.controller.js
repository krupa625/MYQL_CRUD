const User = require('../models/user.model');

createUser = async (req, res) => {
  try {
    const data = await User.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

getUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  user ? res.json(user) : res.status(404).json({ message: 'Not Found' });
};


// updateUser = async (req, res) => {
//     await User.update(req.body, { where: { id: req.params.id } });
//   res.json({ message: 'User Updated'});
// };

updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const newData = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    await user.update(newData);

    res.json({
      message: 'User Updated Successfully',
      data: user
    });

  } catch (err) {
    console.error("Error in updateUser:", err);
    res.status(500).json({ error: err.message });
  }
};

deleteUser = async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ message: 'User Deleted' });
};


module.exports = {
  createUser,   
    getUsers,
    getUser,
    updateUser,
    deleteUser
};