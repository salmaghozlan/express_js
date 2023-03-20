const { User } = require('../model/user');

const getUsers = (req, res) => {
    res.status(200).json( { message: "hello users"});
};

const getUserById = (req, res) => {
    res.status(200).json( { message: `hello user ${req.params.id}` } );
};

const createUser = async(req, res) => {
    console.log("this is a request body: " , req.body);
    const {name , email , password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("all fields are mandatory !");
    }   
  
    res.status(201).json({ message: " create new user" });
    try {
        // Create a new user record
        const newUser = await User.create({
          name: name,
          email: email,
          password: password,
        });
    
        res.status(201).json({ message: 'New user created successfully!', data: newUser });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
};

const updateUser = (req, res) => {
    res.status(200).json({ message: `updated user ${req.params.id}` });
}; 

const deleteUser =    (req, res) => {
    res.status(200).json({ message: `deleted user ${req.params.id}` });
};

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

module.exports = {getUsers ,getUserById, createUser ,updateUser, deleteUser , login};