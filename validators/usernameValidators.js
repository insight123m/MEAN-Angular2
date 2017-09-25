let usernameLengthValidator = (username) => {
  if(!username) {
    return false;
  } else {
    if(username.length < 3 || username.length > 15) {
      return false;
    } else {
      return true;
    }
  }
};

let usernameFormatValidator = (username) => {
  if(!username) {
    return false;
  } else {
    const regExCheck = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/);
    return regExCheck.test(username);
  }
};

module.exports = [{
    validator: usernameLengthValidator,
    message: 'Username must be greater than 3 chars and less than 15 chars'
  }, {
    validator: usernameFormatValidator,
    message: 'Username must be alphanumeric only'
}];
