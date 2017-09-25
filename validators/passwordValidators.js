let passwordLengthValidator = (password) => {
  if(!password) {
    return false;
  } else {
    if(password.length < 5 || password.length > 15) {
      return false;
    } else {
      return true;
    }
  }
};

let passwordFormatValidator = (password) => {
  if(!password) {
    return false;
  } else {
    const regExCheck = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/);
    return regExCheck.test(password);
  }
};

module.exports = [{
    validator: passwordLengthValidator,
    message: 'Password must be greater than 5 chars and less than 15 chars'
  }, {
    validator: passwordFormatValidator,
    message: 'Password must have minimum eight characters, at least one letter, one number and one special character'
}];
