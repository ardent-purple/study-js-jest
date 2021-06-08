const { default: axios } = require('axios')

module.exports = class User {
  all() {
    return axios
      .get('users.json')
      .then((resp) => resp.data)
      .catch((err) => console.log(err.message))
  }
}
