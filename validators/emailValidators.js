let emailLengthValidator = (email) => {
  if(!email) {
    return false;
  } else {
    if(email.length < 5 || email.length > 30) {
      return false;
    } else {
      return true;
    }
  }
};

let emailFormatValidator = (email) => {
  if(!email) {
    return false;
  } else {
    const regExCheck = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExCheck.test(email);
  }
};

module.exports = [{
    validator: emailLengthValidator,
    message: 'Email must be greater than 5 chars and less than 30 chars'
  }, {
    validator: emailFormatValidator,
    message: 'Email must be a valid e-mail'
}];
