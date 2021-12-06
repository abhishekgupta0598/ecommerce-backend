const {BadRequestError} = require("./errors");

function asyncHandler(fn) {
  async function asyncHandlerInternal(req, res, next) {
    try {
      const resp = await fn(req, res, next);
      res.json(resp);
    } catch (e) {
      if (BadRequestError.prototype.isPrototypeOf(e)) {
        console.log(e);
        return res.status(400).json({'msg': e.message});
      }
      console.log(e);
      return res.status(500).json({'msg': 'Something went wrong! Please try again later.'});
    }
  }
  return asyncHandlerInternal;
}

module.exports.asyncHandler = asyncHandler;