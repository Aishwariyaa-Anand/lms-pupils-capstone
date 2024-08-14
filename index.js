require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Started express server at port 4000");
});
