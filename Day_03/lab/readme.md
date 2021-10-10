[![General Assembly Logo](/ga_cog.png)](https://generalassemb.ly)

# Exobiology I

![](https://i.imgur.com/naenSjp.png)

En route to Starbase Regula I on a routine mission, your starship encounters a previously uncharted planet in the Mutara Nebula. A science team is dispatched to the surface to catalogue the flora and fauna of the planet. You will be creating an express app for the uncharted planet.

#### Learning Objectives

- Full CRUD App

#### Prerequisites

- JavaScript
- Node / Express

---

## Getting Started

1. In today's lab folder, `mkdir uncharted_planet`
1. `cd uncharted_planet`
1. Create a new express app
    - `npm init`
    - `touch server.js`
    - what other steps are there to setting up an express app?

## New Route

> Now that the planet is made, our starship can land! Let's make the planet inhabitable by creating a new route.

1. Make a `new` route in your `server.js` and test that it's working correctly by having it `res.send('this is the new route')`
1. Make a views directory and `touch views/new.liquid` (_NOTE:_ don't forget to `npm i liquid`!)
1. In the liquid file, make a `form` with `input`s
    - You will be creating the scientists that come to explore the planet, so include inputs for: name and description
1. Back in your server file, update your `new` route so that it renders the new view page we just created

## Create Route

> Great, the planet is now inhabitable! Let's start sending the scientists in by making a create route.

1. Make a `create` route in your `server.js`
1. Remember to set up the `body-parser` middleware
1. Check to make sure your create route is working correctly and connected to your `new` form we made above by using `res.send(req.body)`
1. Once you're sure the create route is working, update your route so that the newly created data is being saved somewhere
1. Now, let's inhabit the planet! Create 5 scientists!
    - For example, you can make a scientist with the name `Xxylox` that has a description of `A spiky armadillo-like creature that wants to snuggle you with its spikes`

## Index Route

> Now that the planet is inhabited, we should keep a directory of all the inhabitants. Let's create an index page

1. Create an `index` route in your `server.js` and test that the route is correct by `res.send('index')`
1. Create an `index.liquid` file and upgrade your `index` route so that it renders this file
1. Upgrade your `index` route and `index.liquid` files so that it displays all the scientists in your database

(if on day 3 of unit, you can pause here and try implement some of the other cool features of liquid you can read about [here](https://liquidjs.com/tutorials/intro-to-liquid.html)).

## Delete Route (checkout day lecture ahead of time how to do the delete route)

> Uh oh! It turns out that the planet can't handle much and it's quickly reached capacity! We have to send some scientists away by creating a delete route.

1. In your `index.liquid` add a delete form onto all the scientists
1. Don't forget to install and configure `method-override`
1. Create a `delete` route in your `server.js`
1. Make sure the `delete` route deletes just the one specified object/scientist, then redirects to the index page

<hr>

## Hungry for More?

> RUN! Your team has been ambushed by pirates intent on stealing your data! Quick, delete the "database" so they don't get their hands on it!

1. Using a `delete` route, wire up a button that deletes _all_ data at once!

### Hungrier for Even More

1. Create a show page/route for each scientist and link to them from the index page
1. Create categories for the different types of life. For example, store "Plants" and beneath that, "Flowers", and then individual entries.
1. Add a "verified" flag to certain entries and prevent them from being deleted. After all, as a senior Exobiologist _you_ know what you're looking at!
---

*Copyright 2018, General Assembly Space. Licensed under [CC-BY-NC-SA, 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)*


<hr>

[![General Assembly Logo](/ga_cog.png)](https://generalassemb.ly)

# Exobiology II

![](https://i.imgur.com/naenSjp.png)

The previous planet got raided by pirates and our scientists have sucessfully escaped! They are, understandably, a bit shaken. So we have a new batch of scientists that are coming in to take their place and continue the planetary survey while they recoup!

#### Learning Objectives

- Full CRUD App

#### Prerequisites

- Javascript
- Node / Express

---

## Getting Started

1. You'll be working in the same `uncharted_planet` folder
1. If you didn't finish the morning lab, go back and finish that first!
1. If you didn't attempt to delete the entire database, delete all the scientists now
1. Then create 5 new scientists

## Edit Route

> Our five new scientists have been doing well, but it seems the previous five are ready to jump back into action! Let's expand the morning's app so that we can just update the scientists.

1. Create an `edit` route in your `server.js`
1. Create an `edit.liquid` file and fill it with a `form` to edit data
1. Add a link to the `edit` route on your `index.liquid` onto all the scientists

## Put Route

1. Create a `put` route in your `server.js`
1. Make sure the `form` in your `edit.liquid` file has the appropriate method and action
1. Make it so that after updating the data, the route also redirects to the `index` page
1. Update your 5 scientists!

## Hungry for More

1. If you didn't do this morning's hungry for more options, do those first then continue below
1. The show pages of each scientist should have a link to the edit page
1. The edit page should have a delete button which will delete the specified item
1. If you didn't this morning, create categories for the different types of life. For example, store "Plants" and beneath that, "Flowers", and then individual entries. Then be able to edit the names of the categories
1. Create a copy button that duplicates an entry and then goes directly to the edit page
1. Enter images for each item and display them on the homepage. _(Hint: you can use static assets.)_
