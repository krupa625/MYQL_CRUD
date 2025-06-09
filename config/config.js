const dotenv = require("dotenv");
dotenv.config();

module.exports = {
db_pass : process.env.DB_PASS || "kkkkk",
db_host : process.env.DB_HOST || "..",
db_name : process.env.DB_NAME || "kkkk",
db_user : process.env.DB_USER ||    "root",
};