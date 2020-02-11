// Note this object is purely in memory
// When node shuts down this will be cleared.
// Same when your heroku app shuts down from inactivity
// We will be working with databases in the next few weeks.
const users = {};

// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response with json object
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

// function to respond without json body
// takes request, response and status code
const respondJSONMeta = (request, response, status) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response without json object, just headers
  response.writeHead(status, headers);
  response.end();
};

// Success
const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respondJSON(request, response, 200, responseJSON);
};

// Forbidden
const forbidden = (request, response) => {
  const responseJSON = {
    message: 'Access Forbidden',
  };

  respondJSON(request, response, 403, responseJSON);
};

// Internal
const internal = (request, response) => {
  const responseJSON = {
    message: 'Internal Error',
  };

  respondJSON(request, response, 500, responseJSON);
};

// Not Implemented
const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'Webpage not Implemented',
  };

  respondJSON(request, response, 403, responseJSON);
};

// Bad Request
const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // set our error message
    responseJSON.message = 'Missing valid query parameter set to true';
    // give the error a consistent id
    responseJSON.id = 'badRequest';
    // return our json with a 400 bad request code
    return respondJSON(request, response, 400, responseJSON);
  }

  // if the parameter is here, send json with a success status code
  return respondJSON(request, response, 200, responseJSON);
};

// Unauthorized
const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    // set our error message
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    // give the error a consistent id
    responseJSON.id = 'badRequest';
    // return our json with a 400 bad request code
    return respondJSON(request, response, 401, responseJSON);
  }

  // if the parameter is here, send json with a success status code
  return respondJSON(request, response, 200, responseJSON);
};

// get user object
// should calculate a 200
const getUsers = (request, response) => {
  // json object to send
  const responseJSON = {
    users,
  };

  // return 200 with message
  return respondJSON(request, response, 200, responseJSON);
};

// get meta info about user object
// should calculate a 200
const getUsersMeta = (request, response) => {
// return 200 without message, just the meta data
  respondJSONMeta(request, response, 200);
};


// function just to update our object
const updateUser = (request, response) => {
  // change to make to user
  // This is just a dummy object for example
  const newUser = {
    createdAt: Date.now(),
  };

  // modifying our dummy object
  // just indexing by time for now
  users[newUser.createdAt] = newUser;

  // return a 201 created status
  return respondJSON(request, response, 201, newUser);
};

// function for 404 not found requests with message
const notFound = (request, response) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return a 404 with an error message
  return respondJSON(request, response, 404, responseJSON);
};

// All Meta functions
const notFoundMeta = (request, response) => {
  // return a 404 without an error message
  respondJSONMeta(request, response, 404);
};

const successMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

const badRequestMeta = (request, response, params) => {
  if (!params.valid || params.valid !== 'true') {
    return respondJSONMeta(request, response, 400);
  }

  return respondJSONMeta(request, response, 200);
};

const unauthorizedMeta = (request, response, params) => {
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    return respondJSON(request, response, 401);
  }

  return respondJSONMeta(request, response, 200);
};

const forbiddenMeta = (request, response) => respondJSONMeta(request, response, 403);

const internalMeta = (request, response) => respondJSONMeta(request, response, 500);

const notImplementedMeta = (request, response) => respondJSONMeta(request, response, 501);

// set public modules
module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  getUsers,
  getUsersMeta,
  updateUser,
  notFound,
  notFoundMeta,
  successMeta,
  badRequestMeta,
  forbiddenMeta,
  internalMeta,
  unauthorizedMeta,
  notImplementedMeta,
};
