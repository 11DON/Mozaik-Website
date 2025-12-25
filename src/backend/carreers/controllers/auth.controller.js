import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = (req,res) => {
    const {email,password} = req.body;
    console.log("ENV HR_EMAIL:", process.env.HR_EMAIL);
console.log("Request email:", email);

    if(email !== process.env.HR_EMAIL) return res.status(401).json({ message: "Invalid email" });
    
    const valid = bcrypt.compareSync(password,process.env.HR_PASSWORD_HASH);
    if (!valid) return res.status(401).json({ message: "Invalid password" });
    
    const token = jwt.sign ({email},process.env.JWT_SECRET,{expiresIn:"1h"});
    res.json({token});
}