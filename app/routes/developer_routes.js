// Express docs: http://expressjs.com/en/api.html
const express = require("express");
// Passport docs: http://www.passportjs.org/docs/
const passport = require("passport");

// pull in Mongoose model for projects
const Developer = require("../models/developer");
const Project = require('../models/project')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require("../../lib/custom_errors");

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404;
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership;

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require("../../lib/remove_blank_fields");
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate("bearer", { session: false });

// instantiate a router (mini app that only handles routes)
const router = express.Router();

// INDEX 
// GET /projects
router.get("/developers", (req, res, next) => {
  console.log('hey')
  //we want anyone to see projects so no requireToken
  //if we wanted to protect resources we could add that back in between
  //route and callback as second argument
  Developer.find()
    .then((developers) => {
      // `projects` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return developers.map((developer) => developer.toObject());
    })
    // respond with status 200 and JSON of the projects
    .then((developers) => res.status(200).json({ developers: developers }))
    // if an error occurs, pass it to the handler
    .catch(next);
});


// CREATE
// POST /destinations
router.post("/developers/", requireToken, (req, res, next) => {
	console.log('hit')
  // set owner of new projectss to be current user
  req.body.developer.owner = req.user.id;
  Developer.create(req.body.developer)
  // respond to succesful `git statuscreate` with status 201 and JSON of new "project"
  .then((developer) => {
    res.status(201).json({ developer: developer.toObject() });
  })
  .catch(next);
});

// SHOW
// GET 
router.get("/:id", (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Developer.findById(req.params.id)
 
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "project" JSON
    .then((developer) =>
      res.status(200).json({ developer: developer.toObject() })
    )
    // if an error occurs, pass it to the handler
    .catch(next);
});

// UPDATE
// PATCH /projects/5a7db6c74d55bc51bdf39793
router.patch( "/developers/:id", requireToken, removeBlanks, (req, res, next) => {
    // if the client attempts to change the `owner` property by including a new
    // owner, prevent that by deleting that key/value pair
    delete req.body.developer.owner;

    Developer.findById(req.params.id)
      .then(handle404)
      .then((developer) => {
        // pass the `req` object and the Mongoose record to `requireOwnership`
        // it will throw an error if the current user isn't the owner
        requireOwnership(req, developer);

        // pass the result of Mongoose's `.update` to the next `.then`
        return developer.updateOne(req.body.developer);
      })
      // if that succeeded, return 204 and no JSON
      .then(() => res.sendStatus(204))
      // if an error occurs, pass it to the handler
      .catch(next);
  }
)

// DESTROY
// DELETE 
router.delete("/developers/:id", requireToken, (req, res, next) => {
  Developer.findById(req.params.id)
    .then(handle404)
    .then((developer) => {
      // throw an error if current user doesn't own `project`
      requireOwnership(req, developer);
      // delete the project ONLY IF the above didn't throw
      developer.deleteOne();
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next);
});

// SHOW
// GET 
router.get("/developers/:id", (req, res, next) => {
    // req.params.id will be set based on the `:id` in the route
    Developer.findById(req.params.id)
   
      .then(handle404)
      // if `findById` is succesful, respond with 200 and "project" JSON
      .then((developer) =>
        res.status(200).json({ developer: developer.toObject() })
      )
      // if an error occurs, pass it to the handler
      .catch(next);
  });

module.exports = router;
