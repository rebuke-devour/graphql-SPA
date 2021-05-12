# Intro to REST

## Lesson Objectives

1. Describe REST and list the various routes
1. Create an Index route
1. Install JSONView to make viewing JSON easier
1. Create a Show route
1. Enhance the data in your data array

## Describe REST and list the various routes

- REST stands for Representational state transfer
- It's just a set of principles that describe how networked resources are accessed and manipulated
- We have [7 RESTful routes](https://gist.github.com/alexpchin/09939db6f81d654af06b) that allow us basic operations for reading and manipulating a collection of data:

| **URL**          | **HTTP Verb**|**Action**|
|------------------|--------------|----------|
| /photos/         | GET          | index  
| /photos/:id      | GET          | show       
| /photos/new      | GET          | new   
| /photos          | POST         | create   
| /photos/:id/edit | GET          | edit       
| /photos/:id      | PATCH/PUT    | update    
| /photos/:id      | DELETE       | destroy  

## Create an Index route

## Setup our app

1.  Create a directory in student examples called fruits
2.  npm init
3.  Create a `server.js` file.
4.  install express
5.  require express and set up a basic server that logs listening when you start the app
6.  start the app with nodemon and make sure it is working

Let's have a set of resources which is just a javascript array.  To create an index route, we'd do the following:

```javascript
const express = require('express');
const app = express();

const fruits = ['apple', 'banana', 'pear'];

app.get('/fruits/', (req, res) => {
    res.send(fruits);
});

app.listen(3000, () => {
    console.log('listening');
});
```

Now go to http://localhost:3000/fruits/

## Install JSON Formatter to make viewing JSON easier

- JSON stands for Javascript Object Notation
- It's just a way to represent data that looks like a Javascript object or array
- JSON Formatter extension just makes it easier to view JSON data.

Install it:

1.  Go to https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa
1. Click on "Add To Chrome"

## Create a Show route

To create a show route, we'd do this:

```javascript
const express = require('express');
const app = express();

const fruits = ['apple', 'banana', 'pear'];

app.get('/fruits/', (req, res) => {
    res.send(fruits);
});

//add show route
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    res.send(fruits[req.params.indexOfFruitsArray]);
});

app.listen(3000,function(){
    console.log('listening');
});
```

Now go to http://localhost:3000/fruits/1

## Enhance the data in your data array

- Right now are data array `fruits` is just an array of strings
- We can store anything in the array, though.
- Let's enhance our data a bit:

```javascript
const express = require('express');
const app = express();

const fruits = [
    {
        name:'apple',
        color: 'red',
        readyToEat: true
    },
    {
        name:'pear',
        color: 'green',
        readyToEat: false
    },
    {
        name:'banana',
        color: 'yellow',
        readyToEat: true
    }
];

app.get('/fruits/', (req, res) => {
    res.send(fruits);
});

app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    res.send(fruits[req.params.indexOfFruitsArray]);
});

app.listen(3000, () => {
    console.log('listening');
});
```

<hr>

# MVC

## Lesson Objectives

1. Define MVC and explain why it matters
1. Move our data into a separate file
1. Move our presentation code into an Liquid file

## Define MVC and explain why it matters

- One of the core tenants of good programming is to compartmentalize your code
- Already our code is getting a little messy
    - we have data, app instantiation (listening), and routes all in one file
- One way to keep an app from getting messy is to separate it out into three sections
    - Models
        - data (javascript variables)
    - Views
        - how the data is displayed to the user (HTML)
    - Controllers
        - the glue that connects the models with the views
- This allows various developers to divide up a large code base
    - minimizes likelihood of developers overwriting each others code
    - allows developers to specialize
        - one can focus just on getting good with dealing with data
        - one can focus just on getting good with html
        - one can focus just on getting good with connecting the two
- Think of MVC as a restaurant
    - Models are the cook
        - prepares food/data
    - Views are the customer
        - consumes food/data
    - Controllers are the waiter
        - brings food from cook to customer
        - has no idea how food/data is prepared
        - has no idea how the food/data is consumed

## Move our data into a separate file

1. Create a directory called models inside our app directory
1. Inside /models, create your data file (fruits.js)
1. Put your fruits variable in there

    ```javascript
    const fruits = [
        {
            name:'apple',
            color: 'red',
            readyToEat: true
        },
        {
            name:'pear',
            color: 'green',
            readyToEat: false
        },
        {
            name:'banana',
            color: 'yellow',
            readyToEat: true
        }
    ];    
    ```

1. We now require that file in the original server.js

    ```javascript
    const fruits = require('./models/fruits.js'); //NOTE: it must start with ./ if it's just a file, not an NPM package
    ```

1. But, we could have multiple variables in our /models/fruits.js file.
    - How does javascript know which variable in /models/fruits.js to assign to the fruits const in server.js (the result of the `require()` statment)?
    - We must tell javascript which variable we want to be the result of the `require()` statement in server.js

        ```javascript
        //at the bottom of /models/fruits.js
        module.exports = fruits;
        ```

## Move our presentation code into an Liquid file

Now we want to move our View code (HTML) into a separate file just like we did with the data

1. Install the NPM package Liquid (Embedded JavaScript)
    - this is a templating library that allows us to mix data into our html
    - the HTML will change based on the data!
    - `npm install liquid liquid-express`
    - update the creation of the app object `const app = require("liquid-express")(express()); `
1. Create a views directory inside our app directory
1. Inside /views, create a file called show.Liquid
    - this will be the html for our show route
1. Put some html into show.liquid

    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title></title>
        </head>
        <body>
            <h1>Fruits show page</h1>
        </body>
    </html>    
    ```

1. Now, instead of `res.send('some text')`, we can call `res.render('show.Liquid')`
    - express will know to look inside the /views directory
    - it will send the html in the show.Liquid file as a response

        ```javascript
        app.get('/fruits/:indexOfFruitsArray', function(req, res){
            res.render('show');
        });        
        ```

Now lets mix our data into our HTML

1. Our route is acting like the controller now.  Let's gather the data and pass it to the view

    ```javascript
    app.get('/fruits/:indexOfFruitsArray', function(req, res){
        res.render('show', { //second param must be an object
            fruit: fruits[req.params.indexOfFruitsArray] //there will be a variable available inside the Liquid file called fruit, its value is fruits[req.params.indexOfFruitsArray]
        });
    });    
    ```

1. Access the data in the view:

    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title></title>
        </head>
        <body>
            <h1>Fruits show page</h1>
            The {{fruit.name}} is  {{fruit.color}}.
            {% if fruit.readyToEat == true %}
                It is ready to eat
            {% else %}
                It is not ready to eat
            {% endif %}
        </body>
    </html>
    ```

1. Note that there are two types of new tags
    - `{% %}` run some logic
    - `{{ }}` inject a variable

2. Conditional
    - `{% if x == y %}` start an if
    - `{% else %}` else
    - `{% endif %}` end if statement

3. Looping
    - `{% for item in collection %}` start for loop
    - `{% endfor %}` end for loop
    - `forloop.index0` the index of the current loop starting with 0

    
## Update Index Route:

Update the index route in server.js:

```javascript
app.get('/fruits/', (request, response) => {
    response.render(
        'index.Liquid',
        {
            allFruits:fruits
        }
    );
});
```

Create an index.Liquid file:

```Liquid
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        <h1>Fruits index page</h1>
        <ul>
            {% for fruit in fruits %}
                <li>
                    <a href="/fruits/{{ forloop.index0 }}">{{ fruit.name }}</a>
                </li>
            {% endfor %}
        </ul>
    </body>
</html>
```

Add a link back to the index route in show.Liquid:

```html
<a href="/fruits">Back to Index</a>
```
