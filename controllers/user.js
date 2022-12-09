import user from "../../models/user";
import bcrypt from "bcrypt";

const getusers= async(req,res) => 
{
    try{
        const user = await user.findAll();
        res.json(user);
    } catch(error)
    {
        console.error();
    }
}

export const register = async(req,res) => {
    const {name,email,password, confirmpass} = req.body
    if(password !== confirmpass) return res.status(400).json({msg:"Password dan Confirm Password Tidak sesuai"})

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await user.create({
            name:name,
            email:email,
            password:hashPassword,
            roleid:1
        })
        res.json({msg :"Register berhasil"})
    } catch(error)
    {
        console.log(Error);
    }

}