# Mongo Database

## Lesson Objectives

1. Describe what is a Database
1. Describe what is Mongo
1. Understand the difference between a Mongo database, sub-database, collection, and document
1. Get Mongo running
1. List sub-databases
1. choose a sub-database
1. create a collection
1. insert a document
1. insert multiple documents
1. query the collection
1. remove a set of documents
1. update a set of documents
1. drop a Collection or sub-database

# What is a Database

A database is an organized collection of data, stored and accessed electronically.

For our CRUD apps so far we've been hard coding some data. We've been able to make temporary changes, but as soon as we shut down our servers, those changes are gone.

We need a way to make our data persist.

We'll do that by storing/accessing our data from a database.

There are many databases. A common type is a SQL(Structured Query Language) database which stores data in tables and rows, much like an excel spreadsheet/google sheet.

Another type of database is a NoSQL(Not Only SQL) database, which follows a different structure. In our case, we'll be using MongoDB which will store our data in objects (just as we've been seeing with our mock databases)

## What is Mongo

MongoDB is a database that holds JavaScript Objects. The database itself is an application that runs quietly on a computer and waits for connections that make requests and then sends responses (much like a web server).

Mongo is designed to be a database that is flexible and easily scalable.

[Our Cheatsheet](../../../../../wiki/Mongo-Cheatsheet)

## Mongo Sub-Databases

You can have multiple smaller databases stored and available in Mongo.

Imagine a company like Google, they would have multiple databases: one for mail, one for maps, one for drive documents...

For us, we'll have multiple sub-databases, typically one for each lesson, homework and project.

Here is a way you _COULD_ split up sub-databases for an app

![sub database example](https://i.imgur.com/rHgjaUM.png)

# Mongo Collections and Documents

MongoDB is considered a NoSQL (not only SQL, non SQL or non relational), rather than storing things in tables with rows and columns, NoSQL databases use other means. In the case of MongoDB, data is stored in JavaScript objects.

A collection is a set of documents. Documents are a set of data records. This is very abstract. Let's use a simplified real world example of an address book.

Here is one document:

```js
 firstName: "Jennifer",
 lastName: "Juniper",
 address: "Upon the Hill",
 state: "California",
 telephone: "867-5309",
 birthday: "June 8, 1968",
 email: "jenny.juniper@juno.net"

```

A collection, would be many documents: In our case, many contacts.

Remember: having a collection of documents sounds quite reasonable. But having a document of collections is ... kind of odd.

If you're coming from a background where you are used to thinking of data in terms of columns and rows, reading the following could be helpful in transitioning into this new way of modeling data:

[Thinking in Documents Part 1](https://www.mongodb.com/blog/post/thinking-documents-part-1?jmp=docs&_ga=2.202168721.1294830246.1530196908-30583944.1529350623)

[Thinging in Documents Part 2](https://www.mongodb.com/blog/post/thinking-documents-part-2)

## Install Mongo

We already installed Mongo, if you need to reinstall, [follow the directions here](https://git.generalassemb.ly/Web-Development-Immersive-Remote/WDIR-Outrun/wiki/New-Computer-Setup#install-mongo)

## Get Mongo Running

Let's use three terminal tabs. One to keep bash open and available, open a new one to start `mongod` and one more to run the mongo shell.

In terminal, type `mongod`

A bunch of text should come up, but in version 3.6.3, the final line says

![last line of successful mongod](https://i.imgur.com/F8hXqwB.png)

<details><summary>Server is Running All the stuff</summary>

![mongod running successfully](https://i.imgur.com/auSdPvf.png)

</details>

## Connect to Mongo

There are a few ways to connect to Mongo. In this course, there will be two main ways:

- Through terminal in a shell
- Through node using an npm module called `mongoose`

## Connect via Mongo Shell

Open a second terminal tab (do not shut `mongod` tab down), (shortcut key: `command t`)

type `mongo`

A bunch of text should come up, but in version 3.6.3, the final line should have changed from a bash prompt `$` to a `>`

![Mongo Shell Ready to type](https://i.imgur.com/8ZFoWx2.png)

<details><summary>Mongo Shell is Running All the stuff</summary>

![mongo running successfully](https://i.imgur.com/SyN6fWN.png)

</details>

## Connect/Create to a Sub-Database

Let's keep working on our Mongo Shell.

Let's see what sub-databases we have available to us:

`show dbs`

<details><summary>Sample Appearances of Sub Databases</summary>

![Sample Appearances of Sub Databases](https://i.imgur.com/PUIdcLm.png)

</details>

We want to create and use a sub-database called `learn`. With Mongo, if it doesn't exist, Mongo will create it.

Therefore if we type

`use learn`

It will create a sub-database called `learn` and connect to it

<details><summary>Created and Connected to Learn sub-databases</summary>

![create and connect to learn](https://i.imgur.com/ZQ1bck6.png)

</details>

It is likely that our configuration let's us see the db name at our prompt, but in case it doesn't or we want a reminder we can type

```
db
```

To see the database we are currently connected to.

## Create a Collection

For today, we'll only be working with one collection, but most apps will have numerous collections.

Let's think about an online store. You might split up the collections like so:

```
- users
    - username
    - password
    - address
    - creditCardInfo
    - phoneNumber

- products
    - productName
    - catalogNum
    - imageLink
    - price
    - inStock
```

This helps us organize our data.

Let's go back to our address book example and create a collection of contacts.

```js
db.createCollection("contacts");
```

We should get an ok message, if we've done it correctly.

<details><summary>Created a new collection successfully</summary>

![collection create](https://i.imgur.com/vSsT8oO.png)

</details>

We can see what collections we have by typing

```js
show collections
```

## Create, Read, Update and Delete Documents

We've been creating, reading, updating and deleting our 'data' in our Express apps. Now let's learn how to do it using Mongo.

Remember: users are not going to open a Mongo shell and type everything we're going to type. We'll eventually be building apps to interact with our database.

### Insert a document into a Collection (Create)

We'll use the `insert()` method.
We have to tell mongo where to insert it. We'll do that by chaining it to `db.contacts`
It takes two arguments.
The first is always an object of our data.
The second is optional and can let us choose some specific options.

Insert into contacts:

```js
db.contacts.insert();
```

Pass in an object as the first argument

```js
db.contacts.insert({});
```

Add some key value pairs, for Jennifer. We're going to split it up across multiple lines to make it easier to type and see

```js
db.contacts.insert({
  name: "Jennifer",
  phone: 8675309,
  state: "California",
});
```

We can also type our code in VSCode and when we know it's right, copy and paste it over into our Mongo shell. Go with whatever is easier.

<details><summary>Successful insert</summary>

![Successful insert](https://i.imgur.com/YP59kUi.png)

</details>

Let's go ahead and copy paste this into our Mongo shell to populate our collection with more documents

```js
db.contacts.insert([
  {
    name: "Jennifer",
    phone: 8675309,
    state: "California",
  },
  {
    name: "Claire",
    phone: 6060842,
  },
  {
    name: "Morris",
    phone: 7779311,
    state: "Minnesota",
  },
  {
    firstName: "Alicia",
    lastName: "Keys",
    phone: 4894608,
    state: "New York",
  },
  {
    name: "Etta",
    phone: "842-3089",
    state: "California",
  },
]);
```

<details><summary>Successful insert many</summary>

![Successful insert many](https://i.imgur.com/KkviPPh.png)

</details>

We may notice that our data wasn't consistent.

- Jennifer has a duplicate record
- Claire, doesn't have a state
- Alicia's key's are different for her name than others, she also has an extra field for her last name, compared to others.
- Etta's phone number is a string with a hyphen instead of a number

Mongo is designed to be this flexible. Later, we'll learn how to validate our data with an npm package called `mongoose`.

### Query Documents from a Collection(READ)

We'll use the `.find()` method.

We'll do some simple queries. If we provide no argument, it will find all the documents.

Let's try it

```js
db.contacts.find();
```

We may find that to not be as human-readable as we'd like, we can chain another function on it

```js
db.contacts.find().pretty();
```

<details><summary>Successful find all</summary>

![Find All](https://i.imgur.com/RSRhxbi.png)

</details>

Many times, we don't want to find all.

We might want to just find the names of the people who live in California.

We can give our `.find()` method some arguments. The first argument will be a `filter` and the second argument will be a `projection` the project will be the key, it can have a value of 0 (do not show this field) or 1 (do show this field).

When we skip the second argument, we see the whole document:

```js
db.contacts.find({ state: "California" }).pretty();
```

Let's look for the names of people who are in the state of California, and let's not show the `_id` field. We'll add a second argument.

```js
db.contacts.find({ state: "California" }, { name: 1, _id: 0 }).pretty();
```

### Remove Documents from a Collection(DELETE)

Let's remove that duplicate record. We'll use a method called `.remove()`, it takes two arguments, the first is a query (what document are we looking for? - Jennifer's), the second one gives us options

```js
db.contacts.remove({
  name: "Jennifer",
});
```

<details><summary>Ooops two records removed</summary>

![removed two records, oops](https://i.imgur.com/5z4bLmg.png)

</details>

Let's put Jennifer back again twice:

```js
db.contacts.insert({
  name: "Jennifer",
  phone: 8675309,
  state: "California",
});
db.contacts.insert({
  name: "Jennifer",
  phone: 8675309,
  state: "California",
});
```

We should see we did it successfully with the message that we get.

But we can also run a query:

```js
db.contacts.find({ name: "Jennifer" }).pretty();
```

And Let's try to remove again. This time we're going to pass a second argument that will be an object that has the key values of `justOne: true`

```js
db.contacts.remove(
  {
    name: "Jennifer",
  },
  { justOne: true }
);
```

We should have a success message that reads like the following:

```
Removed 1 record(s) in 2ms
WriteResult({
  "nRemoved": 1
})
```

Let's use our `UP arrow` to scroll back to our .find() for Jennifer and check that we now have just one record.

```js
db.contacts.find({ name: "Jennifer" }).pretty();
```

### Update a document (Update)

Like `.remove()`, update takes a query for what to update. But it is also REQUIRED to use an **[update operator](https://docs.mongodb.com/manual/reference/operator/update/)** as part of the second argument in order to prevent destroying our object.

Let's update Jennifer's record to have the name Jenny instead

```js
db.contacts.update({ name: "Jennifer" }, { name: "Jenny" });
```

Success looks like this:

```js
Updated 1 existing record(s) in 35ms
WriteResult({
  "nMatched": 1,
  "nUpserted": 0,
  "nModified": 1
})
```

- we have number matched (nMatched) equal to 1
- we have number upserted (nUpserted) equal to 0 (upsert means if it doesn't exist, create it, we did not create anything this time)
- we have number modified (nModified) equal to 1, which means we modified 1 records.

Let's push the up arrow and run our last command again:

```js
db.contacts.update({ name: "Jennifer" }, { name: "Jenny" });
```

This time we get:

```js
WriteResult({
  nMatched: 0,
  nUpserted: 0,
  nModified: 0,
});
```

We have no matches, no upserts and nothing modified. This is what we expect, since we changed this record the first time we ran it.

Let's find Jenny

```js
db.contacts.find({ name: "Jenny" });
```

We lost the rest of Jenny's record!

![Jenny's Destroyed record](https://i.imgur.com/7lM5jyB.png)

This is because we didn't use an update operator. In order to keep our data intact with an update we must use an update operator.

Let's remove and reinsert Jenny's record and try again

```js
db.contacts.remove({
  name: "Jenny",
});
```

```js
db.contacts.insert({
  name: "Jennifer",
  phone: 8675309,
  state: "California",
});
```

Let's use the `$set` update operator this time

```js
db.contacts.update(
  { name: "Jennifer" },
  {
    $set: { name: "Jenny" },
  }
);
```

Since our data set is very small, let's just look at all of our records

```js
db.contacts.find().pretty();
```

We can add a field. Claire has no state, let's give her a state

```js
db.contacts.update(
  { name: "Claire" },
  {
    $set: { state: "California" },
  }
);
```

We can push the up arrow to rerun

```js
db.contacts.find().pretty();
```

And we should see that Claire now has a state, so we don't have to query for the field that we want to change, we can query for any match.

Because of this, our objects can be ever changing. The way we can reliably be sure we are always getting the right document, is to use the unique id number attributed to each document on creation. Typing these long ids are tough for a code along, but when we start making our express CRUD apps, we'll definitely be using the id numbers a lot.

By default, update will only update one record

```js
db.contacts.update({}, { $set: { bestFriend: true } });
```

Press the up arrow to run

```js
db.contacts.find().pretty();
```

As we can see, just one record was updated. Let's try to update all of our records, by adding a third argument to our `.update()` method

```js
db.contacts.update({}, { $set: { bff: true } }, { multi: true });
```

Press the up arrow to run

```js
db.contacts.find().pretty();
```

### Search for Multiple Values

We can query for multiple values. In our contacts, let's query for people who live in California and are named Etta

```js
db.contacts.find({
  name: "Etta",
  state: "California",
});
```

### Search by Quantitative Data

We can search for equal to, not equal to, greater than, less than or equal to, included in an array etc.

[query operators](https://docs.mongodb.com/manual/reference/operator/query/)

Let's just try one together. Let's query for the people who are NOT in California

```js
db.contacts.find({
  state: { $ne: "California" },
});
```

### Drop a collection

If you need to remove an entire collection

```
db.contacts.drop()
```

If you need to drop an entire sub-database, while you are connected to the database you want to drop:

```
db.dropDatabase()
```

### Remember to quit out of Mongo and Mongo Shell when you are done.

To quit out of the Mongo shell type `exit`

To quit out of Mongo, press `control c`

### Bonus Configuration

Update your mongo shell to always show pretty

Anywhere in bash

```bash
echo DBQuery.prototype._prettyShell = true >> ~/.mongorc.js
```

Turn it off

```bash
echo DBQuery.prototype._prettyShell = false >> ~/.mongorc.js
```

Don't turn it off and on this way repeatedly. Take the time to google and find out more about the config file and how to update it and change your configs.

<hr>

# Intro to Mongoose

## Lesson Objectives

1. Explain what an ODM is
1. Connect to Mongo via text editor
1. Create a Schema for a collection
1. Create a model and save it
1. find a specific model
1. update a model already in the database
1. remove a model already in the database
1. combine actions

## Explain what is an ODM/ Intro to Mongoose

ODM stand for Object Document Model. It translates the documents in Mongo into upgraded JavaScript Objects that have more helpful methods and properties when used in conjunction with express.

Rather than use the Mongo shell to create, read, update and delete documents, we'll use an npm package called `mongoose`. Mongoose will allow us to create schemas, do validations and make it easier to interact with Mongo inside an express app.

![Mongoose Visual](Client_Server.png)

## Make a Schema

A schema will allow us to set specific keys in our objects. So if we have a key of `name`, we won't be able to insert other keys that don't match like `firstName` or `names`. This helps keep our data more organized and reduces the chance of errors.

We can also specify the datatypes. We can set the datatype of `name` to a `string`, `age` to a `number`, `dateOfBirth` to a Date, `bff` to a Boolean etc.

We can also make some fields required and we can set default values as well.

Here is a sample Schema, with many options. We'll be making a smaller variation of this

```js
const articleSchema = new Schema(
  {
    title: { type: String, required: true, unique: true }, //can say whether we want properties to be required or unique
    author: { type: String, required: true },
    body: String,
    comments: [{ body: String, commentDate: Date }], // can have arrays of objects with specific properties
    publishDate: { type: Date, default: Date.now }, // can set defaults for properties
    hidden: Boolean,
    meta: {
      // can have properties that are objects
      votes: Number,
      favs: Number,
    },
  },
  { timestamps: true }
);
```

## Basic Set Up

In `student_examples`

- `mkdir intro_to_mongoose`
- `cd intro_to_mongoose`
- `touch app.js`
- `npm init -y` and go through the prompts
- `npm i mongoose`
- `touch tweet.js`
- `code .`

## Set Up Mongoose

Inside `app.js`

- require mongoose

```js
// Dependencies
const mongoose = require("mongoose");
const Tweet = require("./tweet.js");
```

- tell Mongoose where to connect with Mongo and have it connect with the sub-database `tweets` (if it doesn't exist, it will be created)
- set `mongoose.connection` to a shorter variable name

```js
// Global configuration
const mongoURI = "mongodb://localhost:27017/" + "tweets";
const db = mongoose.connection;
```

- Connect to mongo

```js
// Connect to Mongo
mongoose.connect(mongoURI);
```

Getting a warning like this?
![depreciation](https://i.imgur.com/47eb1oo.png)

Warnings are ok, it'll still work, for now. But in later versions it may stop working and you'll have to update your code.

This should clear up the errors:

```js
mongoose.connect(mongoURI, { useNewUrlParser: true }, () => {
  console.log("the connection with mongod is established");
});
```

- **OPTIONAL** provide error/success messages about the connections

```js
// Connection Error/Success
// Define callback functions for various events
db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", mongoURI));
db.on("disconnected", () => console.log("mongo disconnected"));
```

- While the connection is open, we won't have control of our terminal. If we want to regain control, we have to close the connection.
  Let's set leave the connection open for 5 seconds to demonstrate that the app will hang and then we'll get our close message.

Otherwise we have to press `control c`. When we run an express app, we typically want to leave the connection open, we don't need to get control of terminal back, we just let the app run.

```js
// Automatically close after 5 seconds
// for demonstration purposes to see that you must use `db.close()` in order to regain control of Terminal tab
setTimeout(() => {
  db.close();
}, 5000);
```

- The entire configuration for mongoose:
- Don't memorize it, just set a bookmark and refer back to this as you need it.
- note the setTimeout was just to demonstrate what `db.close()` does, you don't always need it

```js
// Dependencies
const mongoose = require("mongoose");
const Tweet = require("./tweet.js");

// Global Configuration
const mongoURI = "mongodb://localhost:27017/" + "tweets";
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true }, () => {
  console.log("the connection with mongod is established");
});

// Connection Error/Success - optional but can be helpful
// Define callback functions for various events
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", mongoURI));
db.on("disconnected", () => console.log("mongo disconnected"));
```

## Set Up Tweet Schema

In `tweet.js`

```js
const mongoose = require("mongoose"); // require mongoose
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor

// create a new Schema
// This will define the shape of the documents in the collection
// https://mongoosejs.com/docs/guide.html
const tweetSchema = new Schema(
  {
    title: String,
    body: String,
    author: String,
    likes: { type: Number, default: 0 },
    sponsored: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Creating Tweet model : We need to convert our schema into a model-- will be stored in 'tweets' collection.  Mongo does this for you automatically
// Model's are fancy constructors compiled from Schema definitions
// An instance of a model is called a document.
// Models are responsible for creating and reading documents from the underlying MongoDB Database
// from here: https://mongoosejs.com/docs/models.html
const Tweet = mongoose.model("Tweet", tweetSchema);

//make this exportable to be accessed in `app.js`
module.exports = Tweet;
```

## Create a Document with Mongoose

In `app.js`

Let's make ourselves an object to insert into our database. When we connect with an express app, our data will be coming in as an object from the browser.

```js
const myFirstTweet = {
  title: "Deep Thoughts",
  body: "Friends, I have been navel-gazing",
  author: "Karolin",
};
```

```js
Tweet.create(myFirstTweet, (error, tweet) => {
  if (error) {
    //if there is an error console log it
    console.log(error);
  } else {
    // else show us the created tweet
    console.log(tweet);
  }
  // get control of terminal back
  // else just use control c
  db.close();
});
```

Let's run this with
`node app.js`

We should see:

![created via mongoose](https://i.imgur.com/I0EbPuu.png)

Timestamps, deleted, and likes had default values, a unique \_id has been generated

Every time we run `node app.js` it will run the code, and thus insert this object over and over again. Let's not do that. Let's comment it out.

Let's insert many more tweets

```js
const manyTweets = [
  {
    title: "Deep Thoughts",
    body: "Friends, I have been navel-gazing",
    author: "Karolin",
  },
  {
    title: "Sage Advice",
    body: "Friends, I am vegan and so should you",
    author: "Karolin",
    likes: 20,
  },
  {
    title: "Whole Reality",
    body: "I shall deny friendship to anyone who does not exclusively shop at Whole Foods",
    author: "Karolin",
    likes: 40,
  },
  {
    title: "Organic",
    body: "Friends, I have spent $2300 to be one of the first people to own an organic smartphone",
    author: "Karolin",
    likes: 162,
  },
  {
    title: "Confusion",
    body: "Friends, why do you just respond with the word `dislike`? Surely you mean to click the like button?",
    author: "Karolin",
    likes: -100,
  },
  {
    title: "Vespa",
    body: "Friends, my Vespa has been upgraded to run on old french fry oil. Its top speed is now 11 mph",
    author: "Karolin",
    likes: 2,
  },
  {
    title: "Licensed",
    body: "Friends, I am now officially licensed to teach yogalates. Like this to get 10% off a private lesson",
    author: "Karolin",
    likes: 3,
  },
  {
    title: "Water",
    body: "Friends, I have been collecting rain water so I can indulge in locally sourced raw water. Ask me how",
    author: "Karolin",
  },
];
```

Let's insert all these tweets:

```js
Tweet.insertMany(manyTweets, (error, tweets) => {
  if (error) {
    console.log(error);
  } else {
    console.log(tweets);
  }
  db.close();
});
```

- `node app.js`

and let's comment it out so we don't insert duplicates

## Find Documents with Mongoose

- Mongoose has 4 methods for this
- `find` - generic
- `findById` - finds by ID - great for Show routes!
- `findOne` - limits the search to the first document found
- [`where`](http://mongoosejs.com/docs/queries.html) - allows you to build queries, we won't cover this today

Let's find all

```js
Tweet.find((err, tweets) => {
  console.log(tweets);
  db.close();
});
```

Let's limit the fields returned, the second argument allows us to pass a string with the fields we are interested in:

```js
Tweet.find({}, "title body", (err, tweets) => {
  console.log(tweets);
  db.close();
});
```

Let's look for a specific tweet:

```js
Tweet.find({ title: "Water" }, (err, tweet) => {
  console.log(tweet);
  db.close();
});
```

We can also use advanced query options. Let's find the tweets that have 20 or more likes

```js
Tweet.find({ likes: { $gte: 20 } }, (err, tweets) => {
  console.log(tweets);
  db.close();
});
```

### Delete Documents with Mongoose

We have two copies of our first tweet and a few options to delete it

- `remove()` danger! Will remove all instances
- `findOneAndRemove()` - this seems like a great choice
- `.findByIdAndRemove()`- finds by ID - great for delete routes in an express app!

```js
Tweet.findOneAndRemove({ title: "Deep Thoughts" }, (err, tweet) => {
  if (err) {
    console.log(err);
  } else {
    console.log("This is the deleted tweet:", tweet);
  }
  db.close();
});
```

### Update Documents with Mongoose

Finally, we have a few options for updating

- `update()` - the most generic one
- `findOneAndUpdate()`- Let's us find one and update it
- `findByIdAndUpdate()` - Let's us find by ID and update - great for update/put routes in an express app!

If we want to have our updated document returned to us in the callback, we have to set an option of `{new: true}` as the third argument

```js
Tweet.findOneAndUpdate(
  { title: "Vespa" },
  { sponsored: true },
  { new: true },
  (err, tweet) => {
    if (err) {
      console.log(err);
    } else {
      console.log(tweet);
    }
    db.close();
  }
);
```

We'll see the console.logged tweet will have the value of sponsored updated to true. Without `{new: true}` we would get the original unaltered tweet back.

### Intermediate

We can count how many tweets we have with likes greater than 20

```js
Tweet.countDocuments({ likes: { $gte: 20 } }, (err, tweetCount) => {
  console.log("the number of tweets with more than 19 likes is", tweetCount);
  db.close();
});
```

We can check out all the things we can do at the [Mongoose API docs](http://mongoosejs.com/docs/api.html)

### Advanced & New!

[It has an updated query builder that chains much like jQuery](http://mongoosejs.com/docs/queries.html).

Do a search, limit the number of returned queries to 2, sort them by title

```js
Tweet.find({ likes: { $gte: 20 } }, "title -_id")
  .limit(2)
  .sort("title")
  .exec((err, tweets) => {
    console.log(tweets);
    db.close();
  });
```
