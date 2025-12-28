import bcrypt from "bcrypt";

const password = "mypassword";
const hash = bcrypt.hashSync(password, 10);
console.log(hash);
