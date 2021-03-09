const { default: jwtDecode } = require("jwt-decode");
class HelloWorld {
  hello(req) {
    const token = req.session["keycloak-token"];
    console.log(token);
    const userInfo = jwtDecode(token);
    console.log(userInfo);
    return `hello  ${userInfo.name}`;
  }
}

module.exports = new HelloWorld();
