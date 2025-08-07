const storage = require('node-persist');
const bcrypt = require('bcrypt');


storage.init();

const getAllUsers = async (req, res) => {
  try {
    const values = await storage.values();
    res.send(values);
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req,res)=>{
    const id = req.params.id;
    const userData = await storage.getItem(id);
    if(userData)
        return res.status(200).send({'message':'User Found',userData})
    else
        return res.status(404).send({'message':'User Not Found'})
}

const addUser = async (req, res) => {
  try {
    const { id, Name, email, password } = req.body;

    if (!id || !Name || !email || !password) {
      return res.status(400).send("Missing required fields");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    await storage.setItem(id, {
      id,
      Name,
      email,
      password: hashedPassword
    });

    res.status(200).send("User registered successfully");
  } catch (err) {
    console.error("Signup error:", err);  // ✅ log the issue
    res.status(500).send("Something went wrong during signup");
  }
};


const deleteUser = async (req, res) => {

    const id= req.params.id;
    //id is caputer from url
    const userData =await storage.getItem(id);
    if(userData){
        await storage.removeItem(id);
        res.status(200).send('User Deleted Successfully')
    }else{
        res.status(404).send(`User with ID ${id} Not Found.`)
    }

}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const userData = await storage.getItem(id);
    
    if (userData) {
        const { Name, email, password } = req.body;

        if (Name) {
            userData.Name = Name;
        }
        if (email) {
            userData.email = email;
        }
        if (password) {
            userData.password = await bcrypt.hash(password, 10);
        }

        await storage.updateItem(id, userData);
        res.status(200).send({ message: 'User Updated Successfully' });
    } else {
        res.status(404).send(`User with ID ${id} is not Available.`);
    }
}
// POST login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const users = await storage.values();
  const user = users.find(u => u.email === email);

  if (!user) return res.status(404).send({ message: "User not found" });

  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) return res.status(401).send({ message: "Invalid password" });

  res.status(200).send({ message: "Login successful", user });
};


module.exports ={
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
    loginUser
}