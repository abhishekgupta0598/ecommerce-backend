class BadRequestError {
  constructor(message) {
    this.message = message;
  }
}

class DoesNotExistError {}

module.exports = {BadRequestError, DoesNotExistError};