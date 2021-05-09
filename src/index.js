const app = require("./app");
require("./database");

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

app.listen(port, host, () => {
  console.log("Server init on port " + port);
});
