# Full Stack Fruits Build with Mongo and Express

### Part 1 - Setup, Index, Show, New, Create

## Setup

- create a new folder

- create a server.js `touch server.js`

- create a new npm project `npm init -y`

- install dependencies `npm install express mongoose method-override liquid-express-views dotenv morgan`

- install nodemon as a dev dependency `npm install --save-dev nodemon`

- setup the following scripts in package.json

```json
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
```

#### Summary of Dependencies

    - express => web framework for create server and writing routes

    - mongoose => ODM for connecting to and sending queries to a mongo database

    - method-override => allows us to swap the method of a request based on a URL query

    - liquidjs => our templating engine

    - liquid-express => bindings to use the liquid templating language with express

    - dotenv => will allow us to use a `.env` file to define environmental variables we can access via the `process.env` object

    - morgan => logs details about requests to our server, mainly to help us debug

- create a `.env` file with the following dependencies

```
DATABASE_URL=<use your mongodb.com url>
PORT=4000
```

- create a `.gitignore` file with the following (always a good habit to make one even if you have a global .gitignore, the global is there to catch you in case)

```
/node_modules
.env
```

## Setting Up Our server.js

### Import our dependencies

```js
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const mongoose = require("mongoose");
```

### Establish Database Connection

```js
/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG);

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));
```

### Create Our Fruits Model

```js
////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make fruits schema
const fruitsSchema = new Schema({
  name: String,
  color: String,
  readyToEat: Boolean,
});

// make fruit model
const Fruit = model("Fruit", fruitsSchema);
```

### Create App Object

```js
/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require("liquid-express")(express());
```

### Register our Middleware

```js
/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically
```

### Our initial route

```js
////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("your server is running... better catch it.");
});
```

### Server Listener

```js
//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
```

### The complete server.js file

```js
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const mongoose = require("mongoose");

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG);

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make fruits schema
const fruitsSchema = new Schema({
  name: String,
  color: String,
  readyToEat: Boolean,
});

// make fruit model
const Fruit = model("Fruit", fruitsSchema);

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = require("liquid-express")(express());

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("your server is running... better catch it.");
});

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
```

- run server `npm run dev`
- visit `localhost:4000` to see if our test route works

## Seeding Our Database

Before we build all our crud routes we should get some sample data in our database. There are two ways we can facilitate this:

- Seed Route: A route on our server when requested will delete everything in our database and re-seed it with some starter data
- Seed File: A script we can run (usually called seed.js) that'll empty and re-seed our database.

We'll create a seed route for now, later I'll also show you how to setup a seed file when we refactor the application later on.

Add This to your routes

```js
app.get("/fruits/seed", (req, res) => {
  // array of starter fruits
  const startFruits = [
    { name: "Orange", color: "orange", readyToEat: false },
    { name: "Grape", color: "purple", readyToEat: false },
    { name: "Banana", color: "orange", readyToEat: false },
    { name: "Strawberry", color: "red", readyToEat: false },
    { name: "Coconut", color: "brown", readyToEat: false },
  ];

  // Delete all fruits
  Fruit.deleteMany({}).then((data) => {
    // Seed Starter Fruits
    Fruit.create(startFruits).then((data) => {
      // send created fruits as response to confirm creation
      res.json(data);
    });
  });
});
```

now we can use the url `/fruits/seed` as a reset button on our data, great for development. Keep in mind you would want to comment this out in production so users can't reset your data by accident.

## Index Route (Get => /fruits)

Mongoose allows you to write your queries in three ways

- using a callback (what you've done so far)
- using .then
- using async await

So here is how the route would look like all three ways:

#### The .then Method

```js
// index route
app.get("/fruits", (req, res) => {
  // find all the fruits
  Fruit.find({})
    // render a template after they are found
    .then((fruits) => {
      res.render("fruits/index.liquid", { fruits });
    })
    // send error as json if they aren't
    .catch((error) => {
      res.json({ error });
    });
});
```

#### Callback Method

```js
// index route
app.get("/fruits", (req, res) => {
  Fruit.find({}, (err, fruits) => {
    res.render("fruits/index.liquid", { fruits });
  });
});
```

#### The Async/Await Method

```js
// index route
app.get("/fruits", async (req, res) => {
  const fruits = await Fruits.find({});
  res.render("fruits/index.liquid", { fruits });
});
```

## Setting Up Our Views

- create a views and public folder `mkdir views public`

- in the public folder let's make a css and javascript file `touch public/styles.css public/app.js`

- make a fruits folder in views `mkdir views/fruits`

- make a layout.liquid in your views folder `touch views/layout.liquid`

- in the layout.liquid file add the following

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Fruits Website</title>
    <!-- Milligram CSS for Some Default Styling -->
    <!-- Google Fonts -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic"
    />

    <!-- CSS Reset -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
    />

    <!-- Milligram CSS -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css"
    />

    <!-- Jquery -->
    <script
      src="https://code.jquery.com/jquery-3.6.0.min.js"
      integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
      crossorigin="anonymous"
    ></script>

    <!-- OUR CSS AND JS -->
    <link rel="stylesheet" href="/styles.css" />
    <script src="/app.js" defer></script>
  </head>
  <body>
    <header>
      <h1>The Fruits App</h1>
    </header>

    <main>{% block content %}My default content{% endblock %}</main>

    <footer></footer>
  </body>
</html>
```

then put the following in the views/fruits/index.liquid

```html
{% layout "layout.liquid" %} {% block content %}
<div>
  {% for fruit in fruits %}
  <article>
    <a href="/fruits/{{ fruit._id }}">
      <h2>
        {{fruit.name}} - {% if fruit.readyToEat == true %} Ripe {% else %} Not
        Ripe {% endif %}
      </h2>
    </a>
  </article>
  {% endfor %}
</div>
{% endblock %}
```

Now we can see the list of fruits and whether they are ripe or not, except they all have links that don't take us anywhere... because we still need to make the show route and view.

## The Show Route (GET => /fruits/:id)

Add the following route to server.js (remember, always keep the show route at the bottom to avoid route naming collisions)

```js
// show route
app.get("/fruits/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;

  // find the particular fruit from the database
  Fruit.findById(id)
    .then((fruit) => {
      // render the template with the data from the database
      res.render("fruits/show.liquid", { fruit });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
```

- now create `views/fruits/show.liquid`

```html
<!DOCTYPE html>
<html lang="en">
  <%- include("../partials/head.liquid") %>

  <body>
    <%- include("../partials/header.liquid") %>
    <main>
      <div>
        <article>
          <h2>
            <%= fruit.name %> - <%= fruit.readyToEat ? "Ripe" : "Not Ripe" %>
          </h2>
          <h3><%= fruit.color %></h3>
          <a href="/fruits/<%= fruit._id %>/edit"><button>Edit</button></a>
          <form action="/fruits/<%= fruit._id %>?_method=DELETE" method="POST">
            <input type="submit" value="Delete" />
          </form>
          <a href="/fruits/"><button>Back to Main</button></a>
        </article>
      </div>
    </main>
  </body>
</html>
```

So now we can see an individual fruit, we have the delete and edit button setup for later. But before we set that up let's make sure we can create a fruit!

## New Route (GET => /fruits/new)

This route should render a form for the user to create a new fruit, let's add the route! (Remember it should be above your show route)

```js
// new route
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.liquid");
});
```

- let's create `views/fruits/new.liquid`

```html
{% layout "layout.liquid" %} {% block content %}
<div>
  <form action="/fruits" method="post">
    <fieldset>
      <legend>Create a New Fruit</legend>
      <label>
        NAME:<input type="text" name="name" placeholder="enter fruit name" />
      </label>
      <label>
        COLOR:<input type="text" name="color" placeholder="enter fruit name" />
      </label>
      <label> READY TO EAT:<input type="checkbox" name="readyToEat" /> </label>
    </fieldset>
    <input type="submit" value="create new fruit" />
  </form>
</div>
{% endblock %}
```

- let's add a link to this page in fruits/index.liquid

```html
{% layout "layout.liquid" %} {% block content %}
<div>
  <a href="/fruits/new"><button>Create A New Fruit</button></a>
  {% for fruit in fruits %}
  <article>
    <a href="/fruits/{{ fruit._id }}">
      <h2>
        {{fruit.name}} - {% if fruit.readyToEat == true %} Ripe {% else %} Not
        Ripe {% endif %}
      </h2>
    </a>
  </article>
  {% endfor %}
</div>
{% endblock %}
```

Form looks good but it has no create route to submit the forms data too! Let's take care of that!

## Create Route (POST => /fruits)

- let's add the route (location for this route doesn't particularly matter, but your always safe with INDUCES)

```js
// create route
app.post("/fruits", (req, res) => {
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
  // create the new fruit
  Fruit.create(req.body)
    .then((fruits) => {
      // redirect user to index page if successfully created item
      res.redirect("/fruits");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
```

Now you should be able to add fruits!

## Edit Route (GET => /fruits/:id/edit)

This route should produce a form to edit the fruit with the specified id. Let's make the route, make sure it's above the show route.

```js
// edit route
app.get("/fruits/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the fruit from the database
  Fruit.findById(id)
    .then((fruit) => {
      // render edit page and send fruit data
      res.render("fruits/edit.liquid", { fruit });
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
```

- let's make a copy of `views/fruits/new.liquid` and call it `views/fruits/edit.liquid` and refactor it so the form shows the current values of the fruit!

```html
{% layout "layout.liquid" %} {% block content %}
<div>
  <form action="/fruits/{{fruit._id}}?_method=PUT" method="post">
    <fieldset>
      <legend>Edit {{fruit.name}}</legend>
      <label>
        NAME:<input
          type="text"
          name="name"
          placeholder="enter fruit name"
          value="{{fruit.name}}"
        />
      </label>
      <label>
        COLOR:<input
          type="text"
          name="color"
          placeholder="enter fruit name"
          value="{{fruit.color}}"
        />
      </label>
      <label>
        READY TO EAT:<input type="checkbox" name="readyToEat" {% if
        fruit.readyToEat == true %} checked {% endif %} />
      </label>
    </fieldset>
    <input type="submit" value="Edit {{fruit.name}}" />
  </form>
</div>
{% endblock %}
```

Now that edit button we made earlier should take us to the form successfully, but the form doesn't do anything when submitted. That's because we still need to make the update route!

## Update Route (PUT => /fruits/:id)

Let's add the route

```js
//update route
app.put("/fruits/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
  // update the fruit
  Fruit.findByIdAndUpdate(id, req.body, { new: true })
    .then((fruit) => {
      // redirect to main page after updating
      res.redirect("/fruits");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
```

Now you can edit fruits

## Destroy (Delete => /fruits/:id)

This last route will allow our delete button to work giving us full CRUD functionality!

```js
app.delete("/fruits/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the fruit
  Fruit.findByIdAndRemove(id)
    .then((fruit) => {
      // redirect to main page after deleting
      res.redirect("/fruits");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
```

Success, you now have full crud functionality!

## Let's make it better

We will now go through seveal refactors to improve this code base, if you need to see the code as it before these refactors.

- [Code Before Refactoring](https://git.generalassemb.ly/AlexMerced/full-crud-liquid-express)

See the upcoming changes on the branches

## Refactor #1 - Moving the Connection and Model into their own files.

Right now we have all our server logic inside server.js, this is easier when we are developing alone but can quickly become a mess as the code base and development team gets bigger. We should always seeks to separate concerns, meaning moving the different pieces of our application into their own files. So let's let's start setting up our project to have a more MVC structure.

#### Move the connection

- create a folder called models, and in it a file called connection.js

- move our connection code from server.js to models/connection.js

```js
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const mongoose = require("mongoose");

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG);

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));

////////////////////////////////////////////////////
// Export the Connection
////////////////////////////////////////////////////

module.exports = mongoose;
```

#### Moving the Model

- then we should house each of our models in their own file that uses the connection. Make a models/fruit.js and move the code defining the fruit model in there.

```js
//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connection");

////////////////////////////////////////////////
// Define Model
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make fruits schema
const fruitsSchema = new Schema({
  name: String,
  color: String,
  readyToEat: Boolean,
});

// make fruit model
const Fruit = model("Fruit", fruitsSchema);

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Fruit;
```

So now import the model where it is used (currently server.js)...

```js
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const Fruit = require("./models/fruit");
```

Our server.js is already starting to look a lot cleaner!

[Checkout this branch to see the code up to this point](https://git.generalassemb.ly/AlexMerced/full-crud-liquid-express/tree/refactor1)

## Refactor #2 - Move the fruit routes into a controller/router

It'll organize and speed up our application to bundle our related routes into routers, typically routes that share the same prefix/namespace. In this case we have several routes that start with `/fruits/` we can bundle all these into one router.

- make a folder called controllers and in that folder make a fruit.js

- let's import express and create a router in that file, then export that router

```js
////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Fruit = require("../models/fruit");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
```

- Now copy over all our fruits routes from server.js to the routes section of our controller

- change each reference to `app` to `router`

- remove the `/fruits/` from the endpoint, we'll define this when we register the router

```js
////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Fruit = require("../models/fruit");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

router.get("/seed", (req, res) => {
  // array of starter fruits
  const startFruits = [
    { name: "Orange", color: "orange", readyToEat: false },
    { name: "Grape", color: "purple", readyToEat: false },
    { name: "Banana", color: "orange", readyToEat: false },
    { name: "Strawberry", color: "red", readyToEat: false },
    { name: "Coconut", color: "brown", readyToEat: false },
  ];

  // Delete all fruits
  Fruit.deleteMany({}).then((data) => {
    // Seed Starter Fruits
    Fruit.create(startFruits).then((data) => {
      // send created fruits as response to confirm creation
      res.json(data);
    });
  });
});

// index route
router.get("/", (req, res) => {
  // find all the fruits
  Fruit.find({ username: req.session.username })
    // render a template after they are found
    .then((fruits) => {
      console.log(fruits);
      res.render("fruits/index.liquid", { fruits });
    })
    // send error as json if they aren't
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// new route
router.get("/new", (req, res) => {
  res.render("fruits/new.liquid");
});

// create route
router.post("/", (req, res) => {
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
  // add username to req.body to track related user
  req.body.username = req.session.username;
  // create the new fruit
  Fruit.create(req.body)
    .then((fruits) => {
      // redirect user to index page if successfully created item
      res.redirect("/fruits");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// edit route
router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the fruit from the database
  Fruit.findById(id)
    .then((fruit) => {
      // render edit page and send fruit data
      res.render("fruits/edit.liquid", { fruit });
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//update route
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
  // update the fruit
  Fruit.findByIdAndUpdate(id, req.body, { new: true })
    .then((fruit) => {
      // redirect to main page after updating
      res.redirect("/fruits");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the fruit
  Fruit.findByIdAndRemove(id)
    .then((fruit) => {
      // redirect to main page after deleting
      res.redirect("/fruits");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// show route
router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;

  // find the particular fruit from the database
  Fruit.findById(id)
    .then((fruit) => {
      console.log(fruit);
      // render the template with the data from the database
      res.render("fruits/show.liquid", { fruit });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
```

Your app should now be working just like it was before but now should be more organized. Notice all the pieces for fruits have been broken down into MVC.

- `models/fruit.js` - handles the getting the database connection and defining the fruit model (share of data)

- `views/fruits/` - this folder contains all our views/templates for our fruits

- `controllers/fruit.js` - creates all our routes which pull data from the model and sends them over to the templates

Essentially we just repeat this pattern for each category of functionality we want to add to our app.

[Check this branch to see the code up to this point](https://git.generalassemb.ly/AlexMerced/full-crud-liquid-express/tree/refactor2)

## Refactor #3 - Using a Seed File

Seed routes are great convienient but you do run the risk of forgetting to remove the route before releasing the app creating a way a user can just reset your app, even if by accident. May be safer to seed your database in a non-route so only you can seed the database. This is usually dont by creating a seperate file that can be run as a script where you can put any database code you like.

- create a `models/seed.js` file

```js
///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("./connection");
const Fruit = require("./fruit");

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// save the connection in a variable
const db = mongoose.connection;

// Make sure code is not run till connected
db.on("open", () => {
  ///////////////////////////////////////////////
  // Write your Seed Code Below
  //////////////////////////////////////////////

  // Run any database queries in this function
  const startFruits = [
    { name: "Orange", color: "orange", readyToEat: false },
    { name: "Grape", color: "purple", readyToEat: false },
    { name: "Banana", color: "orange", readyToEat: false },
    { name: "Strawberry", color: "red", readyToEat: false },
    { name: "Coconut", color: "brown", readyToEat: false },
  ];

  // Delete all fruits
  Fruit.deleteMany({})
    .then((deletedFruits) => {
      // add the starter fruits
      Fruit.create(startFruits)
        .then((newFruits) => {
          // log the new fruits to confirm their creation
          console.log(newFruits);
          db.close();
        })
        .catch((error) => {
          console.log(error);
          db.close();
        });
    })
    .catch((error) => {
      console.log(error);
      db.close();
    });

  ///////////////////////////////////////////////
  // Write your Seed Code Above
  //////////////////////////////////////////////
});
```

Let's write a script in package.json that will run this file for us

```js
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "seed": "node models/seed.js"
  },
```

Now we can run our seed with `npm run seed`

[Check this branch to see the code up to this point](https://git.generalassemb.ly/AlexMerced/full-crud-liquid-express/tree/refactor3)

# Bonus Refactors if there is Time

## Refactor #4 - Adding Session Based Authentication

Let's define some terms

- Authentication: Proving the user exists usually with a password (logging in)
- Authorization: Checking if the logged in user is allowed to use the specified resource

**Authentication**

This is typically done by comparing a password a user has entered with one they provided at signup. The only wrinkle is for security purposes we will want to encrypt the password using something called bCrypt.

**Authorization**

There are two main ways to achieve this:

- Session Based Auth: This is a better choice if all resources the logged in user needs to access is on the same backend server. In this scenario a user logs in and a cookie is created for the browser session (until they close the browser or logout). This cookie will identify a tiny packet of data on our server we can then access with anything we'd like to store in it like the users login status or user information.

_The data is on the server, the cookie allows us to know which data belongs to which logged in user._

- JWT Token based Auth: This is a better choice for API and applications split accross multiple servers. Instead of saving the data on the server, the data is encoded into a token that each server knows how to decode. When accessing protected resources on the server the token must be presented. If the server can successfully decode the token then the user must be logged in, and the users info will be payload inside the decoded token.

_The data is on the token, the token proves we are logged in and contains our info in the browser not the server_

For our particular app, session based auth will be the better pattern. In units 3 & 4 where we will build APIs, JWT tokens will be the better way to do it.

#### Authorization

- Let's install some dependencies `npm install bcryptjs express-session connect-mongo`

  - bcryptjs: a pre-compiled version of bcrypt which we will use to encrypt passwords

  - express-session: middleware for creating session cookies

  - connect-mongo: plugin that will allow express session to save session data in our mongo database

**CREATE USER MODEL**

create `model/user.js`

```js
//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connection");

////////////////////////////////////////////////
// Define Model
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make fruits schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// make fruit model
const User = model("User", userSchema);

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = User;
```

**Create a User Controller**

- create `controllers/user.js`

```js
////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// The Signup Routes (Get => form, post => submit form)
router.get("/signup", (req, res) => {
  res.render("user/signup.liquid");
});

router.post("/signup", (req, res) => {
  res.send("signup");
});

// The login Routes (Get => form, post => submit form)
router.get("/login", (req, res) => {
  res.render("user/login.liquid");
});

router.post("/login", (req, res) => {
  res.send("login");
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
```

- connect the router to server.js

```js
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const FruitRouter = require("./controllers/fruit");
const UserRouter = require("./controllers/user");

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express());

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

////////////////////////////////////////////
// Routes
////////////////////////////////////////////

app.use("/fruits", FruitRouter); // send all "/fruits" routes to fruit router
app.use("/user", UserRouter); // send all "/user" routes to user router

app.get("/", (req, res) => {
  res.send("your server is running... better catch it.");
});
```

**CREATE USER VIEWS**

- create `views/user/signup.liquid` and `views/user/login.liquid`

`signup.liquid`

```html
{% layout "layout.liquid" %} {% block content %}
<div>
  <form action="/user/signup" method="post">
    <fieldset>
      <legend>New User</legend>
      <label>USERNAME: <input type="text" name="username" required /> </label>
      <label
        >PASSWORD: <input type="password" name="password" required />
      </label>
      <input type="submit" value="Create Account" />
    </fieldset>
  </form>
</div>
{% endblock %}
```

`login.liquid`

```js
{% layout "layout.liquid" %}
{% block content %}
      <div>
        <form action="/user/login" method="post">
          <fieldset>
            <legend>User Login</legend>
            <label
              >USERNAME: <input type="text" name="username" required />
            </label>
            <label
              >PASSWORD: <input type="password" name="password" required />
            </label>
            <input type="submit" value="Login" />
          </fieldset>
        </form>
      </div>
{% endblock %}
```

**Make Signup Post Response**

`controllers/user.js`

```js
router.post("/signup", async (req, res) => {
  // encrypt password
  req.body.password = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  );
  // create the new user
  User.create(req.body)
    .then((user) => {
      // redirect to login page
      res.redirect("/user/login");
    })
    .catch((error) => {
      // send error as json
      console.log(error);
      res.json({ error });
    });
});
```

**Make Login Post Response**

```js
router.post("/login", async (req, res) => {
  // get the data from the request body
  const { username, password } = req.body;
  // search for the user
  User.findOne({ username })
    .then(async (user) => {
      // check if user exists
      if (user) {
        // compare password
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          // redirect to fruits page if successful
          res.redirect("/fruits");
        } else {
          // error if password doesn't match
          res.json({ error: "password doesn't match" });
        }
      } else {
        // send error if user doesn't exist
        res.json({ error: "user doesn't exist" });
      }
    })
    .catch((error) => {
      // send error as json
      console.log(error);
      res.json({ error });
    });
});
```

Users need a way to get to the login and sign up pages so let's refactor the home route in server.js.

```js
app.get("/", (req, res) => {
  res.render("index.liquid");
});
```

let's create a `views/index.liquid`

```html
{% layout "layout.liquid" %} {% block content %}
<div>
  <a href="/user/signup"><button>Signup</button></a>
  <a href="/user/login"><button>Login</button></a>
</div>
{% endblock %}
```

#### Authorization

So now a user can signup and login but it doesn't really do much for us. A user can still access all pages whether they are logged in or not and the app doesn't remember if they are logged in after they switch pages. So while the user is authenticated we need to setup the ability to track whether they have authority to access things, authorization.

**Configuring Sessions Middleware**

Add a SECRET to your environment variables

```
SECRET=thisCanBeAnythingYouWant
```

Let's adjust our middleware in server.js

```js
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const FruitRouter = require("./controllers/fruit");
const UserRouter = require("./controllers/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express());

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically
// middleware to setup session
app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    saveUninitialized: true,
    resave: false,
  })
);
```

This now adds a property to the request object (req.session), we can use this object to store data between requests. Perfect for storing whether the user is logged in or not!

**Saving Login info in Session**

Refactor your login post route in `controllers/user.js`

```js
router.post("/login", async (req, res) => {
  // get the data from the request body
  const { username, password } = req.body;
  // search for the user
  User.findOne({ username })
    .then(async (user) => {
      // check if user exists
      if (user) {
        // compare password
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          // store some properties in the session object
          req.session.username = username;
          req.session.loggedIn = true;
          // redirect to fruits page if successful
          res.redirect("/fruits");
        } else {
          // error if password doesn't match
          res.json({ error: "password doesn't match" });
        }
      } else {
        // send error if user doesn't exist
        res.json({ error: "user doesn't exist" });
      }
    })
    .catch((error) => {
      // send error as json
      console.log(error);
      res.json({ error });
    });
});
```

add a logout route to destroy the session

```js
router.get("/logout", (req, res) => {
  // destroy session and redirect to main page
  req.session.destroy((err) => {
    res.redirect("/");
  });
});
```

**Authorization Middleware**

So now the user data is in sessions, we just need middleware to check it and bounce users to login if they try to access pages that require login.

We will only add this protection to our `/fruits` routes, so we'll add it as middleware in our fruits router.

`controllers/fruit.js`

```js
////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Fruit = require("../models/fruit");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/user/login");
  }
});
```

**Add Logout Button**

Add the following button to `views/fruits/index.liquid`

```html
<a href="/user/logout"><button>Logout</button></a>
```

**User Specific Fruits**

Wouldn't it be nice if each fruit belonged to a user, and the user can only see their fruits when they login?

1. first we need to update the model so we can track the username of the creater in `models/fruit.js`

```js
// make fruits schema
const fruitsSchema = new Schema({
  name: String,
  color: String,
  readyToEat: Boolean,
  username: String,
});
```

2. Then we need to refactor the create route to add the username before creating the fruit, in `controllers/fruit.js`

```js
// create route
router.post("/", (req, res) => {
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
  // add username to req.body to track related user
  req.body.username = req.session.username;
  // create the new fruit
  Fruit.create(req.body)
    .then((fruits) => {
      // redirect user to index page if successfully created item
      res.redirect("/fruits");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
```

3. Update index route to only show the logged in users fruits, by querying only fruits whose username matches the username stored in session

```js
// index route
router.get("/", (req, res) => {
  // find all the fruits
  Fruit.find({ username: req.session.username })
    // render a template after they are found
    .then((fruits) => {
      console.log(fruits);
      res.render("fruits/index.liquid", { fruits });
    })
    // send error as json if they aren't
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
```

There you go, users can login and out and only see fruits associated with their account!

[Check this branch to see the code up to this point](https://git.generalassemb.ly/AlexMerced/full-crud-liquid-express/tree/refactor4)

## Bonus Refactor #5 - Isolating the Middleware

Let's move the middleware into it's own file like we did the models and controllers

`utils/middleware.js`

```js
/////////////////////////////////////////
// Dependencies
/////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const FruitRouter = require("../controllers/fruit");
const UserRouter = require("../controllers/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");

/////////////////////////////////////
// MiddleWare Function
//////////////////////////////////////

const middleware = (app) => {
  app.use(morgan("tiny")); //logging
  app.use(methodOverride("_method")); // override for put and delete requests from forms
  app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
  app.use(express.static("public")); // serve files from public statically
  app.use(
    session({
      secret: process.env.SECRET,
      store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
      saveUninitialized: true,
      resave: false,
    })
  );
};

///////////////////////////////////////////
// Export Middleware Function
//////////////////////////////////////////
module.exports = middleware;
```

Now we can really strip down our server.js

```js
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const express = require("express"); // import express
const middleware = require("./utils/middleware");
const FruitRouter = require("./controllers/fruit");
const UserRouter = require("./controllers/user");

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express());

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
middleware(app);

////////////////////////////////////////////
// Routes
////////////////////////////////////////////

app.use("/fruits", FruitRouter); // send all "/fruits" routes to fruit router
app.use("/user", UserRouter); // send all "/user" routes to user router

app.get("/", (req, res) => {
  res.render("index.liquid");
});

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
```

[Check this Branch to see code so far](https://git.generalassemb.ly/AlexMerced/full-crud-liquid-express/tree/refactor5)

## Bonus Refactor #6 - the home router

Let's get all routes outside of server.js by making a homerouter for "/" routes

- create `controllers/home.js`

```js
////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

router.get("/", (req, res) => {
  res.render("index.liquid");
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
```

- let's connect the router in our server.js

```js
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const express = require("express"); // import express
const middleware = require("./utils/middleware");
const FruitRouter = require("./controllers/fruit");
const UserRouter = require("./controllers/user");
const HomeRouter = require("./controllers/home");

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express());

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
middleware(app);

////////////////////////////////////////////
// Routes
////////////////////////////////////////////

app.use("/fruits", FruitRouter); // send all "/fruits" routes to fruit router
app.use("/user", UserRouter); // send all "/user" routes to user router
app.use("/", HomeRouter); // handle all other requests

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
```

[The final code can be seen here](https://git.generalassemb.ly/AlexMerced/full-crud-liquid-express/tree/refactor6)