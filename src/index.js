const server = require("./config");

const app = server().app;

app.listen(server().PORT, () => console.log(`API Running at PORT: ${server().PORT}`));

module.exports = app;