const dotenv = require("dotenv");
dotenv.config();

module.exports = {
DB_PASS : process.env.db_pass || "kkkkk"
};