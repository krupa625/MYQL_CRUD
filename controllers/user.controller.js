const { User, Profile, Post, Role } = require('../models');

// Create user + profile (1:1)
createUser = async (req, res) => {
  try {
    const { name, email, profile } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const user = await User.create({ name, email });
    if (profile) {
      await Profile.create({ ...profile, userId: user.id });
    }

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all users
getUsers = async (req, res) => {
  const users = await User.findAll({ include: [Profile, Post, Role] });
  res.json(users);
};

// GET user by ID
getUser = async (req, res) => {
  const user = await User.findByPk(req.params.id, { include: [Profile, Post, Role] });
  user ? res.json(user) : res.status(404).json({ message: 'User not found' });
};

// UPDATE user
updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.update(req.body);
  res.json({ message: 'User updated', user });
};

// DELETE user
deleteUser = async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ message: 'User deleted' });
};

// CREATE Post for User (1:M)
createPostForUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const post = await Post.create({ ...req.body, userId: user.id });
  res.status(201).json({ message: "Post created", post });
};

// ASSIGN Roles to User (M:M)
assignRolesToUser = async (req, res) => {
  const { roleIds } = req.body; // Example: [1, 2]

  if (!Array.isArray(roleIds)) {
    return res.status(400).json({ message: "roleIds must be an array of role IDs" });
  }

  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Check if all roleIds exist
  const roles = await Role.findAll({ where: { id: roleIds } });

  if (roles.length !== roleIds.length) {
    return res.status(400).json({ message: 'Some roleIds are invalid' });
  }

  await user.setRoles(roleIds); // This will bulk insert into UserRoles
  const assignedRoles = await user.getRoles();
  res.json({ message: 'Roles assigned successfully', roles: assignedRoles });
};

createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body); // expects { name: 'Admin' }
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// CREATE Profile (1:1)
createProfile = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const profile = await Profile.create({ ...req.body, userId: user.id });
  res.status(201).json({ message: "Profile created", profile });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createPostForUser,
  assignRolesToUser,
  createProfile,
  createRole
};
