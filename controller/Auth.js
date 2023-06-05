const User = require("../model/Auth")
const bycrypt = require("bcryptjs")
const {v4:uuidv4} = require("uuid")


const Register = async(req,res)=>{
    try {
        const {username,password,name,email} = req.body;

        if(!username || !password){
           return res.status(400).json({msg:"all feild are required"})
        }

        
        const salt = 10;
        const hashedPassword = await bycrypt.hash(password,salt)

        // check if user already exist 
        const existingUser = await User.findOne({username})
        if(existingUser){
           return res.status(400).json({msg:"user already exist"})
        }

        const uuid = new uuidv4();
        const newUser = new User({
            uuid,
            username,
            password:hashedPassword,
            email,
            name
        })


        await newUser.save()
        res.status(200).json({msg:"successfully register"})
    } catch (error) {
        console.log(error)
       return res.status(500).json({msg:"internal server error"})
    }
}

const Login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ msg: "Username and password are required." });
      }
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(400).json({ msg: "Invalid username or password." });
      }
  
      const isPasswordMatched = await bycrypt.compare(password, user.password);
  
      if (!isPasswordMatched) {
        return res.status(400).json({ msg: "Invalid username or password." });
      }
      const uuid = uuidv4()
  
      res.status(200).json({
        uuid,
        msg: "Successfully logged in.",
        user: {
          username: user.username,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal server error." });
    }
  };
  

const changeUserDetails = async(req,res)=>{
    try {
        const {uuid} = req.params
        const { username, name, email, password } = req.body;
        const user = await User.findOne({uuid})

        if(!user){
            return res.status(400).json({msg:"user not found"})
        }

        if(username) user.username = username
        if(name) user.name = name
        if(email) user.email = email
        if(password){
            const salt = await bycrypt.genSalt(10)
            const hashedPassword = await bycrypt.hash(password,salt)
            user.password = hashedPassword
        }
    
        await user.save()
        res.status(200).json({msg:"successfully changes"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"internal server error"})
    }
}

const getUser = async (req,res)=>{
    try {
        const {uuid} = req.params.uuid;        
        const user = await User.findOne({uuid})
        if(!user){
            return res.status(400).json({msg:"user does not found"})
        }

        res.status(200).json({user:{
            name:user.name,
            username:user.username,
            email:user.email,
            uuid:user._id
        }})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"internal server error"})
    }
}

module.exports= {
    Register,
    Login,
    changeUserDetails,
    getUser
}