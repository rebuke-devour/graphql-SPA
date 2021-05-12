# CRUD App with Mongoose - Delete and Update

## Lesson Objectives

Deletion:

1. Create a Delete Button
1. Create a DELETE Route
1. Have the Delete Button send a DELETE request to the server
1. Make the DELETE Route Delete the Model from MongoDB

Edit/Update:

1. Create a link to the edit route
1. Create an edit route
1. Create an PUT route
1. Have the edit page send a PUT request
1. Make the PUT Route Update the Model in MongoDB
1. Make the PUT Route Redirect Back to the Index Page

## Create a Delete Button

In your index.liquid file

```html
<li>
    <a href="/fruits/{{fruit.id}}">{{fruit.name}}</a>
    <!--  ADD DELETE FORM HERE-->
    <form>
        <input type="submit" value="DELETE"/>
    </form>
</li>
```

## Create a Delete Route

```javascript
app.delete('/fruits/:id', (req, res)=>{
    res.send('deleting...');
});
```

## Have the Delete Button send a DELETE request to the server

When we click "DELETE" on our index page (index.liquid), the form needs to make a DELETE request to our DELETE route.

The problem is that forms can't make DELETE requests.  Only POST and GET.  We can fake this, though.  First we need to install an npm package called `method-override`

```
npm install method-override
```

Now, in our server.js file, add:

```javascript
//include the method-override package
const methodOverride = require('method-override');
//...
//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));
```

Now go back and set up our delete form to send a DELETE request to the appropriate route

```html
<form action="/fruits/{{fruit.id}}?_method=DELETE" method="POST">
```

## Make the Delete Route Delete the Model from MongoDB

Also, have it redirect back to the fruits index page when deletion is complete

```javascript
app.delete('/fruits/:id', (req, res)=>{
    Fruit.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/fruits');//redirect back to fruits index
    });
});
```

## Create a link to an edit route

In your `index.liquid` file:

```html
<a href="/fruits/{{fruit.id}}/edit">Edit</a>
```

## Create an edit route/page

First the route:

```javascript
app.get('/fruits/:id/edit', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{ //find the fruit
        res.render(
    		'edit.liquid',
    		{
    			fruit: foundFruit //pass in found fruit
    		}
    	);
    });
});
```

Now the liquid:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        <h1>Edit Fruit Page</h1>
        <form>
            <!--  NOTE: the form is pre-populated with values for the server-->
            Name: <input type="text" name="name" value="{{fruit.name}}"/><br/>
            Color: <input type="text" name="color" value="{{fruit.color}}"/><br/>
            Is Ready To Eat:
            <input type="checkbox" name="readyToEat"
                {% if fruit.readyToEat == true %}
                    checked
                {% endif }}
            />
            <br/>
            <input type="submit" name="" value="Submit Changes"/>
        </form>
    </body>
</html>
```

## Create an PUT route

```javascript
app.put('/fruits/:id', (req, res)=>{
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    res.send(req.body);
});
```

## Have the edit page send a PUT request

In the `edit.liquid`

```html
<form action="/fruits/{{fruit.id}}?_method=PUT" method="POST">
```

## Make the PUT Route Update the Model in MongoDB

```javascript
app.put('/fruits/:id', (req, res)=>{
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    Fruit.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        res.send(updatedModel);
    });
});
```

## Make the PUT Route Redirect Back to the Index Page

```javascript
Fruit.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
    res.redirect('/fruits');
});
```

<hr>

# Express Router

## Lesson Objectives

1. Explain What Express.Router does for us
1. Create External Controller File for Routes
1. Move Server.js Routes to External Controller File
1. Require Mongoose in Controller File
1. Use Controller File in Server.js
1. Remove References to Base of Controller's URLs

## Explain What Express.Router does for us

- Our server.js file is getting rather bloated
- express.Router will let us put our routes in a separate file

## Create External Controller File for Routes

1. `mkdir controllers`
1. `touch controllers/fruits.js`
1. Edit controllers/fruits.js

```javascript
const express = require('express');
const router = express.Router();

module.exports = router;
```

## Move Server.js Routes to External Controller File

rename `app` to `router`

```javascript
const express = require('express');
const router = express.Router();

router.get('/fruits/new', (req, res)=>{
    res.render('new.liquid');
});

router.post('/fruits/', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    Fruit.create(req.body, ()=>{
        res.redirect('/fruits');
    });
});

router.get('/fruits', (req, res)=>{
    Fruit.find({}, (error, allFruits)=>{
        res.render('index.liquid', {
            fruits: allFruits
        });
    });
});

router.get('/fruits/:id', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{
        res.render('show.liquid', {
            fruit:foundFruit
        });
    });
});

router.delete('/fruits/:id', (req, res)=>{
    Fruit.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/fruits')
    });
});

router.get('/fruits/:id/edit', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{ //find the fruit
        res.render(
    		'edit.liquid',
    		{
    			fruit: foundFruit //pass in found fruit
    		}
    	);
    });
});

router.put('/fruits/:id', (req, res)=>{
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    //{new: true} tells mongoose to send the updated model into the callback
    Fruit.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel)=>{
        res.redirect('/fruits');
    });
});

module.exports = router;
```

## Require Fruit Model in Controller File

```javascript
const express = require('express');
const router = express.Router();
const Fruit = require('../models/fruits.js')
//...
```

The `Fruit` model is no longer needed in `server.js`.  Remove it:

```javascript
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
```

## Use Controller File in Server.js

```javascript
const fruitsController = require('./controllers/fruits.js');
app.use(fruitsController);
```

## Remove References to Base of Controller's URLs

You can specify when a middleware runs

```javascript
const fruitsController = require('./controllers/fruits.js');
app.use('/fruits', fruitsController);
```

Since we've specified that the controller works with all urls starting with /fruits, we can remove this from the controller file:

```javascript
const express = require('express');
const router = express.Router();

router.get('/new', (req, res)=>{
    res.render('new.liquid');
});

router.post('/', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    Fruit.create(req.body, ()=>{
        res.redirect('/fruits');
    });
});

router.get('/', (req, res)=>{
    Fruit.find({}, (error, allFruits)=>{
        res.render('index.liquid', {
            fruits: allFruits
        });
    });
});

router.get('/:id', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{
        res.render('show.liquid', {
            fruit:foundFruit
        });
    });
});

router.delete('/:id', (req, res)=>{
    Fruit.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/fruits')
    });
});

router.get('/:id/edit', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{ //find the fruit
        res.render(
    		'edit.liquid',
    		{
    			fruit: foundFruit //pass in found fruit
    		}
    	);
    });
});

router.put('/:id', (req, res)=>{
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    //{new: true} tells mongoose to send the updated model into the callback
    Fruit.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel)=>{
        res.redirect('/fruits');
    });
});

module.exports = router;
```

<hr>

# Creating a Seed Route

## Lesson Objectives

1. Create a Seed Route

## Create a Seed Route

Sometimes you might need to add data to your database for testing purposes.  You can do so like this:

```javascript
app.get('/fruits/seed', (req, res)=>{
    Fruit.create(
        [
            {
                name:'grapefruit',
                color:'pink',
                readyToEat:true
            },
            {
                name:'grape',
                color:'purple',
                readyToEat:false
            },
            {
                name:'avocado',
                color:'green',
                readyToEat:true
            }
        ], 
        (err, data)=>{
            res.redirect('/fruits');
        }
    )
});
```
