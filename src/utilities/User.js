/* eslint-disable */
const User = {
  isAuthenticated: localStorage.getItem("ibdb-token") !== null,
  token: localStorage.getItem("ibdb-token"),
  user: localStorage.getItem("user") && JSON?.parse(localStorage?.getItem("user")),
  role: localStorage.getItem("user") && JSON?.parse(localStorage?.getItem("user"))?.roleName,
  getToken() {
    return User.token;
  },
  getUser() {
    return User.user;
  },
  getRole() {
    return User.role;
  },

  setUserKey(key, value) {
    return new Promise((resolve, reject) => {
      User.user[key] = value;
      localStorage.setItem("user", JSON.stringify(User.user));
      resolve();
    });
  },
  authenticate(token, user) {
    return new Promise((resolve, reject) => {
      console.log(user);
      User.isAuthenticated = true;
      User.token = token;
      User.user = user;
      User.role = user?.roleName;
      localStorage.setItem("ibdb-token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("ibdb-role", user?.roleName);
      resolve();
    });
  },
  authenticateFromToken(token, user) {
    return new Promise((resolve, reject) => {
      User.isAuthenticated = true;
      User.token = token;
      User.user = user;
      User.role = user.role;
      localStorage.setItem("ibdb-token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("ibdb-role", user?.roleName);
      resolve();
    });
  },
  signout(cb) {
    return new Promise((resolve, reject) => {
      User.isAuthenticated = false;
      User.token = null;
      User.user = null;
      User.role = null;
      localStorage.removeItem("ibdb-token");
      localStorage.removeItem("user");
      localStorage.removeItem("ibdb-role");
      resolve();
    });
  },
};

export { User };
