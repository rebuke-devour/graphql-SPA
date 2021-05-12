# Intro to the Internet

## Lesson Objectives

1. Define what a server is
1. Diagram the request response cycle
1. Describe the different parts of a URL
1. Explain what Node.js is and why it's useful
1. Diagram how the internet works
1. Explain what DNS is
1. Describe what packets are and how they travel to servers

## Define what a server is

A server is just a computer that is always turned on and connected to the internet

## Diagram the request response cycle

![Request Response Cycle](https://cdn.zapier.com/storage/photos/9ec65c79de8ae54080c1b417540469a6.png)

There four different types of requests we can make which correspond to four basic ways we can manipulate data

- POST (Create data)
- GET (Read data)
- PUT/PATCH (Update data)
- DELETE (Destroy data)


## Describe the different parts of a URL

URL stands for Uniform Resource Locator, and it's just a string of text characters used by Web browsers, email clients and other software to format the contents of an internet request message.

Let's breakdown the contents of a URL:

```
    http://www.example.org:3000/hello/world/foo.html?foo=bar&baz=bat#footer
    \___/  \_____________/ \__/ \_________________/ \_____________/ \____/
  protocol  host/domain    port        path          query-string  hash/fragment
```

Element | About
------|--------
protocol | the most popular application protocol used on the world wide web is HTTP. Other familiar types of application protocols include FTP, SSH, GIT, FILE, HTTPS
host/domain name | the host or domain name is looked up in DNS to find the IP address of the host - the server that's providing the resource
port | a server can have multiple applications listening on multiple ports.  This allows users to access a different application on the same host
path | web servers can organize resources into what is effectively files in directories; the path indicates to the server which file from which directory the client wants
query-string | the client can pass parameters to the server through the query-string (in a GET request method); the server can then use these to customize the response - such as values to filter a search result
hash/fragment | this URL fragment is generally used by the client to identify some portion of the content in the response; interestingly, a broken hash will not break the whole link - it isn't the case for the previous elements


## Explain what Node.js is and why it's useful

- Node is just a command line application that reads a JavaScript file and executes it within the context of the terminal
	- until recently, JavaScript could only be executed within a browsers
- Node allows JavaScript to become the first programming language that can be executed in both the browser and in a terminal application
	- Makes it easier to find a developer who can build all aspects of a web application
- Asynchronous
	- Uses event handlers (just like click, hover, etc) so you can tell an application to run code while waiting for other commands to finish executing
		- previously, long running commands like updating a database would have to finish before the application could continue running

## Diagram how the internet works

- [How the Internet Works in 5 Minutes](https://www.youtube.com/watch?v=7_LPdttKXPc)

1. Request starts at local computer
1. Goes to Router (can have multiple computers hooked up to it, forming a Local Area Network)
1. Goes to Modem
1. Goes ISP (internet service provider)
1. ISP is connected to other ISPs and similar institutions
	- we're in the actual net at this point
1. If the ISP isn't connected to the Network containing the final destination
	- it will ask the networks it is connected to if they are connected to the final destination's network
	- this process continues, building up a path to the final destination
		- each path to the final destination contains how many nodes it must visit to get to destination
		- can determine shortest path to final destination
1. Once connection to final destination is made, it goes to final destination's network (ISP)
1. From ISP it goes to the modem
1. From the modem, it goes to the router
1. From the router, it goes to the host computer





### HTTP Status Codes
When requests and responsese are made 2 things are sent
- headers
- body

<br>

Request/Response Headers
<br>
Always sent, which give details about the request/response. Things like:

- Accept: types of media allowed (ie `text/plain`)
- Date: the date
- Host: domain name of host
<br>

[A more complete list here](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields)

<br>

The other portion is the `body` of the request. The `body` may be empty, but generally includes the actual content being sent.

<br>

`Express` and our browser will be handling most of the details of our request/response headers.

<br>

However, we often will want to send HTTP Status Codes. The most common ones we encounter is propbably `404` Not Found.

<br>

We can get a sampling of codes, with memorable visuals [here](https://www.flickr.com/photos/girliemac/sets/72157628409467125/) or [here](https://httpstatusdogs.com/)
<br>
Or, [here is a link to the offical documents](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)


<hr>

# Intro to Express

## Lesson Objectives

1. Describe what is a 'back end'
1. Install Node packages
1. Set up a basic Express server
1. Set up a basic GET route
1. Use nodemon to restart your sever when your code changes
1. Save a record of what packages your application uses

## Describe what is a back end

So far, you've been working on the `front end`, you've been building things with HTML, CSS and JavaScript that appear in a browser.

Now we'll start learning about the back end and how that is tied to the front end.

A backend typically consists of a server (takes client requests and sends responses), an application (the logic of what to do with the request - get flight information/get directions to somewhere/ etc.) and a database (store, retrieve, update information/data etc.)

Let's take a moment to think about `Amazon`, Amazon has 300 million products and counting. Each item has its own web page.

Amazon does not have thousands of web developers carefully handcrafting each web page for each item by hand and updating them as needed. Rather, the pages are built dynamically. The developers build an HTML template and then work with the data of the products to create individualized web pages based on the data. Things like price, images of the item, description of the item etc. are stored in a database, this data is retrieved and interpolated with the HTML. This requires the use of a server and a database.

In this unit, we'll be building our own web applications with Node.js/Express  that will allow the computer to respond to other computers' requests. At first our responses will be simple text. But we'll build up to sending HTML, then sending dynamic HTML that works with data, and finally building our apps to interact with a database.

## Install Node packages

- Node.js is an application that lets us run JavaScript outside of the browser and in the terminal. We'll use node.js to build simple servers that will respond to browser requests.

- Built into Node.js is something called npm, which stands for `Node Package Manager`, which will manage Node Packages

- Node packages are libraries (or frameworks - see below) of code that provide useful functionality. Much like jQuery for the browser, node packages help us write sophisticated programs with a lot of useful functionality right out of the box. These packages are published at [www.npmjs.com](https://www.npmjs.com/)


These chunks of code fall into one of two categories

- Libraries
    - A collection of functions, objects, and even other libraries that you call
    - It has no idea what you're going to build
- Frameworks
    - Is essentially just a library
    - Is also a pre-conceived skeleton for an application
    - It knows what you're going to build and is somewhat opinionated about how you should do it

We'll be working with one package throughout this unit called `express` - which calls itself a framework AND unopinionated  `¯\_(ツ)_/¯`

[express](https://www.npmjs.com/package/express) is a `Fast, unopinionated, minimalist web framework for node`.

At first, we'll be running our express server in terminal and we'll interact with it in our browser. Our browser will send requests to our express app, and our express app will send responses back to our own browser.

## Activity - Download our First npm Package

- cd into `student_examples`
- `mkdir first_server`
- `cd first_server`


First we have to initialize our directory with a `package.json` file. We can create it interactively by typing

`npm init` in terminal

- We'll get a few prompts asking us what the name of our project is, the version, what our main file is etc. To keep the default, you can just press enter. To update it you can do it with the prompts OR you can manually edit the `package.json` file that will be created.

Here is a very minimal `package.json` - it's just a text file with an object in it

![package.json](https://i.imgur.com/oX88ZQB.png)

It's totally ok to edit this file - for example, if I forgot to put myself as the author I could add it as a string. If I didn't like my project name, I could update it too. **GOTCHA** be careful to keep this as a proper object and keep track of your strings or else you will get errors and your code will not run.


To install (download) a package, first you must know its name (each name is unique in npm).  Then run:

```
npm i package-name
```

**Note**: `npm i` - is new as of version 5.0.0, older versions of npm require you to type `npm install` instead. You can type `npm install` with version 5.0.0 (and up) with no errors.

Additionally, in the old version it was required to type `--save` in order to update the `package.json`, with version 5.0.0 `npm i` automatically updates the `package.json`. If you type `npm i express --save` with the new version, it won't error or do anything different. If you are running 4.x.x or below, if you forget to type `--save` it won't update the `package.json`

As you explore different npm packages and read documentation you may see one syntax or the other.

Let's install the library `express`:

```
npm i express
```

We can see that we've successfully added because or `package.json` file will have updated (under dependencies)

![package.json with express](https://i.imgur.com/jHWP7bd.png)


Additionally, we see that we now have a directory called `node_modules` and a file called `package-lock.json`

![files](https://i.imgur.com/sS4uziE.png)

We're not going to edit our `package-lock.json` file, it's just a helper file for npm that helps npm do some under the hood stuff.

Inside `node_modules` is all the code that was downloaded so we could use `express`, the code is tucked into folders that are managed by npm. Like jQuery, we don't ever have to look at the source code or modify it in any way, it can just sit there and we'll bring in the code and use it in our own files.  


## Set up a basic Express server

In the root of our project, `touch server.js`

![server.js](https://i.imgur.com/FlNsHyM.png)

Now that the library has been installed (downloaded), we can use it in our code, by using the `require()` function

```javascript
const express = require('express');
```

- For proof of conecept that we've pulled in the code from the express module, let's `console.log(express)`

- run our code by typing `node server.js` in terminal

- We can see it's a giant object with a ton of properties and functions. We can learn how to use this functionality by checking out the docs.

[express on npm](https://www.npmjs.com/package/express)

[Full express documentation](http://expressjs.com/en/api.html)

Looking at express on npm we see how to build the most bare bones simple server

![express server on npm](https://i.imgur.com/u3Dfkql.png)

It looks like we have a good start, but have to write a little more code. And we'll continue to write our code with the newer `ES6` syntax (`const` instead of `var` and arrow functions)

Add:

![](https://i.imgur.com/qlTWMWB.png)

- Start the app by executing `node server.js` in the command line. It'll now run continuously because of the functionality of the `app.listen`

- Therefore, it will start and then you won't get your bash prompt back, it'll just hang

**Note**: If you want to quit your server, you have to use `control c`


1. Visit http://localhost:3000/ in your browser.  You should see your 'Hello world' text. You've successfully created a basic web server!  This will serve dynamic pages to web browsers.

So let's look a little deeper at our code

`const app = express();`
this creates a shorthand for calling the express function. Less typing!

`app.listen(3000);` this says 'express listen to the port 3000' , by default it will be listening to localhost (your own computer)- it will be listening and waiting for any requests coming to `localhost:3000` from the browser (or [127.0.0.1](https://www.trendhunter.com/trends/127-0-0-1-doormat) )

We can see `app.listen` fire by using a callback

![](https://i.imgur.com/K63AyVC.png)

Only you on your computer can access your `localhost`, later we'll learn how to update the settings so your server can live on the web and other computers can send requests.

Finally, we have to unpack this very dense bit of code:

![](https://i.imgur.com/6Jpyt2m.png)

These 3 lines of code are doing a lot!

First, we're calling express, and we're setting a 'GET' route of '/', that means if a user goes to `localhost:3000/` this is the method that will get triggered.

Then we pass a call back function with two parameters, by convention, they are `req` (for request) and `res` (for response)

Inside our callback we can write whatever code we want.

In this case we are using a method on the response object (`res.send()`) - that is saying 'send this plain text as the response'


We can build as many routes as we like and customize them to do whatever we want.


![](https://i.imgur.com/eIN0lrM.png)

**Final code**:

```js
const express = require('express');

const app = express();

app.get('/', (req, res)=>{
  res.send('Hello world');
});

app.listen(3000);

```

**Final code with comments and console.logs**:


```js
// Dependencies
const express = require('express');
const app = express();

// listen for when someone goes to
// localhost:3000/
// upon getting a request at that URL
// send text 'Hello World'

// Routes
app.get('/', (req, res) => {
  console.log("Oh hey! I got a request. Let me respond with something");
  res.send('Hello World!');
});

app.get('/somedata', (request, response)=>{
  // console.log('response: ', response);
  // console.log('===================');
  response.send('here is your information');
});

// App Listen
app.listen(3000, ()=> {
  console.log("I am listening for requests!!!");
});
```

**On semi-colons**: The debate of using semi-colons everywhere is being hotly debated. The place you will end up working will likely have strong opinions. Recommendation: choose a style for a project and be consistent.

## Set up another basic GET route

Now we'll create our own basic GET route so that visitors to (clients of) our web-server can retrieve some information from it.

We can also pass a callback to our `app.listen` which is handy to use to send a `console.log` message to terminal to let us know if our sever is up and running

Let's add a get route, so when a user goes to `localhost:3000/somedata`, they'll get a text response of `here is your information`

![](https://i.imgur.com/eG7QGIy.png)

- The function passed as a second parameter to `app.get()` is executed each time a user (client) goes to http://localhost:3000/somedata
- The function (callback) takes two parameters
    - `request`
        - object containing information about the request made (browser, ip, query params, etc)
    - `response`
        - object containing methods for sending information back to the user (client)

- We can see the response in the browser

## Shut down your server

You can't run two servers on the same port and you can get annoying errors if you don't shut your servers down properly. Get in the habit of `control c` to shut your server down when you are done working.

## Use nodemon to restart your sever when your code changes

An NPM package called `nodemon` allows us to run code just like `node`, but it will restart the application whenever code in the application's directory is changed. This is really handy and gives us a better workflow.

1. Install it `npm install nodemon -g`
    - the `-g` tells npm to make the package available for use in the terminal in any directory (globally). You might not be able to install node packages globally by default. You may have to run `sudo npm i nodemon -g` and enter your computer's username and password
1. Now we can call `nodemon server.js`, and the server will restart whenever the app's code changes

1. If you want to get really fancy, you can go to your `package.json` file and change the value of `main` from `index.js` to `server.js` - now you can just type `nodemon` in terminal and it will 'know' you mean to run `server.js`

When you start a new project and do `npm init` and go through the prompts, you can set this right away.


## package.json and node_modules revisited

When we downloaded express it installed a lot of code (inside `node_modules`) - we don't need to track these files and upload/download them to and from github. All the info needed is in the `package.json`

To avoid tracking/uploading/downloading files that don't need to be tracked or shouldn't be tracked (passwords, secrets) you can create a file called `.gitignore`

It will ignore whatever files and folders you tell it. Our class repository already has a `.gitignore`, but when you start your own projects, you'll want to be sure to create one.

Let's give it a whirl:


1. Create a file called `.gitignore`
1. In it, add the line `node_modules`
1. You can check to see if it works by going to `github` if you see your `node_modules` folders there, you have not properly ignored your `node_modules`
1. note, our class repo already has a `.gitignore`, so you really should never see `node_modules` there
1. At first, it won't matter if you ignore  your node modules. But once you go to host your server on the web, having these tracked can cause weird errors and make your server break. We'll talk about this more later.


<hr>

# URL and Query Parameters

## Lesson Objectives

1. Read URL parameters
1. Common error: two responses
1. Common error: Place routes in correct order
1. Multiple Params
1. Request Object
1. URL Queries
1. Extra: Environment Variables

## Express Review from the morning

#### Express

- Express is a code library hosted on `npm` that is written in JavaScript. Express is a library/un-opinionated framework for building a web server
- we initialize our folder as an npm project by typing `npm init`
- we add npm packages by typing `npm install <package-name>` e.g. `npm install express`
- we use the `require()` function to bring in the code
- we add `app.listen(port)` to turn on our server, by default, it will listen to `http://localhost`, we have to pick a port, usually ports for servers that we'll be building are in the numeric range of 3000 - 9000. When we host our projects on the web, the port will be automatically configured for us

#### Express Routes
Once our server is configured, we have to add routes.

Routes are kind of like event listeners. They get set up and they just wait. But rather that waiting for a user to click on a button, the routes wait for someone to go to their URL in the browser. When you type in the browser, the only type of request you can make is a `get` request. We'll learn later how to make other types of request. But for today, all routes will start with `app.get('/')`

Once someone goes to that URL, it'll trigger a callback. The callback always needs two parameters `request` then `response` and always in that order.

`request` and `response` (or can be named `req` and `res` for short) are objects that have a lot of properties and functions built-in. You can `console.log` each of these params and we'll do that together a bit later.

One function on the `response` object is `send()`, which let's us send a string back to the browser.

```js
app.get('/free_samples', (request, response) => {
  response.send('here are some free samples')
})
```




## Read URL parameters

Most of the time, we'll use segments in the path section of the URL to modify how our application works.

To do this, we'll use request parameters. To the user, it'll just look like an extension of the url path.

Let's think of Amazon again. With 300 million products and counting, hard coding a route for each product and keeping track of it all would be nightmarish.

We'll work with a simplified example. Imagine a store: `The Botany Express` that sells a few plants. Rather than having a dedicated route for each plant, the plants are stored as data (in our case an array of strings). We can access the data by passing in the index as a part of the request URL.

To set URL parameters in your `server.js` , just add a colon after the forward slash and then a variable name.

'Regular' URL:
`/plants`

URL parameter:
`/:indexOfPlantsArray`

The entire route:

![](https://i.imgur.com/22YLbjv.png)

We can access the value of `:indexOfPlantsArray` with `req.params.indexOfPlantsArray`

### Let's code together to see this in action.

In `student_examples`:
- `mkdir express_plants`
- `cd express_plants`
- `touch server.js`
- `npm init`
- `npm i express`

Here is an array of plants, we can copy paste this bit of 'data':

```js
const plants = ['Monstera Deliciosa', 'Corpse Flower', 'Elephant-Foot Yam', "Witches' Butter",];
```

![](https://i.imgur.com/nW50B6Q.png)

Start up your server in terminal

Now visit http://localhost:3000/0 in your browser
> Monstera Deliciosa

Now visit http://localhost:3000/3 in your browser
> Witch's Butter

Note: http://localhost:3000
> error cannot GET (we didn't write a route for this)

Let's breakdown the contents of our localhost URL:

```
    http://localhost:3000/2
    \___/  \_______/ \__/ \_/
  protocol    host   port   path*           
```

Path can be a URL or a URL parameter: it will look the same in the browser. The difference will be in the server.

The URL parameter, will be added as a `key:value` pair inside the `request.params` object. The key is what we named it in our server, the value will be whatever the user has typed in the browser.

## A Common Error

You can only have one response for every request. If you try to send multiple responses you'll get an error. Let's try it!

```js
app.get('/oops/:indexOfPlantsArray', (req, res) => {
    res.send(plants[req.params.indexOfPlantsArray]);
    // error cannot send more than one response!
    res.send('this is the index: ' + req.params.indexOfPlantsArray);
});

```

We can, however, have multiple statements if we use our `if` statements or other program logic correctly:


```js
app.get('/fixed/:indexOfPlantsArray', (req, res) => {
    if (plants[req.params.indexOfPlantsArray]) {
          res.send(plants[req.params.indexOfPlantsArray]);
    } else {
      res.send('cannot find anything at this index: ' + req.params.indexOfPlantsArray);
    }

});

```



## Place routes in correct order

- Express starts at the top of your `server.js` file and attempts to match the url being used by the browser with routes in the order in which they're defined
- URL params (e.g. :foo, :example, :indexOfPlantsArray) can be anything, a number, or even a string
  - Therefore if you have these routes in this order in your `server.js`:
    - `/:color`
    - `/plants`
  - And you want to get to `/plants` - you'll always hit the `/:color` route because the URL parameter will accept _any_ string, it doesn't know that `plants` is something specific/special
  - To fix this, we put the more specific routes first
    - `/plants`
    - `/:color`
  Now, from top to bottom, the more specific route `/plants` will be triggered when the URL has `plants` and if it doesn't match `plants`, it will go to the next route.


Let's code an example of this together:



```javascript
const express = require('express');
const app = express();
const port = 3000;

const plants = ['Monstera Deliciosa', 'Corpse Flower', 'Elephant-Foot Yam',  "Witches' Butter",];

app.get('/:indexOfPlantsArray', (req, res) => { //:indexOfPlantsArray can be anything, even awesome
    res.send(plants[req.params.indexOfPlantsArray]);
});

app.get('/awesome', (req, res) => { //this will never be reached
  res.send(`
    <h1>Plants are awesome!</h1>
    <img src="https://static.boredpanda.com/blog/wp-content/uuuploads/plant-sculptures-mosaicultures-internationales-de-montreal/plant-sculptures-mosaicultures-internationales-de-montreal-14.jpg" >
  `);
});

app.listen(port,() => {
    console.log('listening on port' , port);
});
```

If this happens, reorder them so that more specific routes come before less specific routes (those with params in them)

```javascript
const express = require('express');
const app = express();
const port = 3000;

const plants = ['Monstera Deliciosa', 'Corpse Flower', 'Elephant-Foot Yam',  "Witches' Butter",];

app.get('/awesome', (req, res) => {
  res.send(`
    <h1>Plants are awesome!</h1>
    <img src="https://static.boredpanda.com/blog/wp-content/uuuploads/plant-sculptures-mosaicultures-internationales-de-montreal/plant-sculptures-mosaicultures-internationales-de-montreal-14.jpg" >
  `);
});

app.get('/:indexOfPlantsArray', (req, res) => {
    res.send(plants[req.params.indexofPlantsArray]);
});

app.listen(port,() => {
    console.log('listening on port' , port);
});
```

# Multiple Params

We can store multiple params in the `req.params` object:

&#x1F535; **Write in (5 min)**

```
app.get('/hello/:firstname/:lastname', (req, res) => {
	console.log(req.params);
	res.send('hello ' + req.params.firstname + ' ' + req.params.lastname);
});
```

* In your browser, go to `localhost:3000/bob/bobbybob`

&#x1F535; **Check the req.params console.log in Terminal**

![](https://i.imgur.com/xrq5rSu.png)

* Try entering different firstnames and lastnames in your URL and check the results

<br>
<hr>


# The Request object

This is just interesting, as well as informative, but not necessary to get anything to work.

What happens if we console.log the entire Request Object?

`console.log(req)`?

In the `hello/:firstname/:lastname` route, before `res.send`, write in:

```js
  console.log('=========================================');
  console.log('This is the entire Request Object sent from the browser to the server: ');
  console.log(req);
  console.log('========================================');
```

This will allow you to see the **entire request object**. This object contains all of the information that the browser sends to the server. There's a ton of information in there!

![](https://i.imgur.com/fvmFn3x.png)


&#x1F535; **Activity (5 min)**

* In the browser, go to the firstname/lastname route
* Have a look through the entire request object in Terminal
* Find the `req.params` object within it.
* The `req` object is where the `req.params` object is stored when the browser makes a request to the server.

`req.params` is an object nested within the `req` object.

`req.params` is the only one we will need for today.


# req.query

A query is a key-value pair separated with an `=`, and added to the URL with a `?`. It is put at the end or the URL. These vallues are stored in a separate object from `req.params`: they are stored in the object `req.query`

`?someKey=someValue`

```
localhost:3000/howdy/Edinburgh?title=duke
```

```javascript
app.get('/howdy/:firstName', function(req, res) {
  console.log(req.params);
  console.log(req.query);
  res.send('howdy ' + req.query.title + ' ' + req.params.firstName);
});
```

You can add multiple queries

```
localhost:3000/hello?title=duke?year=2001
```

Spaces are represented with a `%20`.
