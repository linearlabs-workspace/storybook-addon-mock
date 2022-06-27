export const schema = {
    url : (value) => { return ''; },
    method: (value) => { return ''; },
    status: (value) => { return ''; },
    response: (value) => { return ''; },
};

export function validate(object, schema) {
    var errors = Object.keys(schema).filter(function (key) {
      return !schema[key](object[key]);
    }).map(function (key) {
      //
      return new Error(key + " is invalid.");
    });
  
    if (errors.length > 0) {
      errors.forEach(function (error) {
        console.log(error.message);
      });
    } else {
      console.log("info is valid");
    }
  }