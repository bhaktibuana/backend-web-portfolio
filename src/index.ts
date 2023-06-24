import app from "./app";
import { config } from "./configs";

app.listen(config.serverPort, () => {
  console.log("Server is listening on port", config.serverPort);
});