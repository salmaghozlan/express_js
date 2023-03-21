const { User } = require('../models/user');


const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user with the given email address
      const user = await User.findOne({ where: { email: email } });
  
      // Check if the user exists and the password matches
      if (!user || !user.verifyPassword(password)) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
  
      // Generate a new JWT token for the user
      let token = user.generateAuthToken();
      console.log(token);
  
      // Send the response with the token
      res.status(200).json({ message: 'Login successful!', token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error'  });
    }
  };

  module.exports = { login};
