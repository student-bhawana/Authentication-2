const { validationResult } = require("express-validator");
 const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      success: false,
      message: errors.errors[0].msg,
      data: [],
    });
  }else{
    next()
  }
};
module.exports={validateRequest}