## React BoilerPlate
--


1. We are going to download a basic react boilerplate
    - Consists of these project files (Consists of JSX + ES6)
        - componont_1.js
        - component_2.js
        - component_3.js
        - React.js
        - Redux.js
    - Tooling (Transpiles JSX + ES6 to ES5)
        - webpack 
        - babel
    - Basics
        - index.html
        - application.js
        - style.css
    - All of this compiles into our Web page or WebApp

2. Lets get started by downloading our Boilerplate application
    - [BoilerPlate](https://github.com/stephengrider/ReduxSimpleStarter)

3. npm install  // install all our dependencies



## Project Setup
--

1. What are we gonna build?
    - Simple webpage YouTube Clone using Youtube API
        - Search Bar
        - Video
            - With Playback Controls
            - Box Below with Video Title and Description
        - Additional Videos Gallery

2. Lets start our React App Next using
    - npm start
        - starts up the local server
        - remember npm converts all of our code using webpack and babel
        - localhost:8080 to view our app


## JSX
---

1. Take a look at the index.html
    - we notice it has bootstrap
    - at the bottom it has script tag associated with bundle.js
        - webpack and babel transpile the code together to create bundle.js 

2. Lets look at the components app.js next
    - src/components/app.js
    - First notice the 'React Simple Starter'
        - Change it shows on the local the text has changed on our development server

3. Cool, now lets DELETE IT ALL and start from scratch  
    - click on src delete the folder
        - so we can really understand how it all works
    - Recreated the src folder and add index.js file
    
4. Before we get started lets go over React
    - What is React?
        - React is a JS library that is used to produce html that is shown to a user in the web browser
        - When we write React code, we write individual components or views
        - Components are snippets of code that produce HTML
        - When we write React code we write multiple different components
        
5. Our first Component
    - Create a new component
        - This component should produce some html
    - Take this components generated HTML and put it on the page (in the DOM)

6. Breakdown
```
const App = function(){
    return <div>Hi!</div>;
}
```
    - const is an es6 tag  
    - function is a normal js tag
        - But notice the <div> HTML tag
            - we don't normally have html in JS
            - This is JSX
    - if we run our App now, nothing is rendered because we haven't taking this component and put on the page (DOM)

## More JSX
---

(Babeljs.io)[babeljs.io] 

1. What is the purpose of JSX?
    - This is the actual HTML that gets inserted into the DOM when we render the component
    - if we were to type out the code using vanilla js we woud have to type alot more code, that's why developers use JSX
    - use the link above to paste our app to see how much code is needed.
    - JSX is much more clean and concise

## ES6 Import Statements
--

1. Code within a JS project is in Silos
    - This means libraries, variables, functions and other data will not interact unless explicitly stated.

    - So at the top of our code we can add 1 line of code to import React
        ``import React from 'react';``

## ReactDOM vs React
--

current code
```
import React from 'react';

// Create a new component. This shoudl produce some html

const App = function(){
    return <div>Hi!</div>;
}

React.render(App)
```


1. Lets try to render our React now and see what happens (open console)
    - We see deprecation warning and to use ReactDOM to render
    - So we need to use BOTH React and reactDOM
    - Great lets run it again, MORE ERRORS

2. Invalid Component Error 
    - App is a type of component
        - We need to instantiate our components before we try and render them to the DOM
        - It's very easy, no worries
            - wrap App in < />

## Render Targets
--

3. Another Error now in the browser
    - Violation Target container is not a DOM element
    - this error means we need to pass a second argument into our reactDom.render. This will be the location tag of where we want to render our APP on the index.html
    - Look at our index.html and we will notice a div with class container
        - this is our root container for our app component
            - any other additional components will be rendered as children elements of the root
    - Below in the code you will see how we use dom manipulation to select our root container
    
``ReactDOM.render(<App />, document.querySelector('.container'))``
        
## Additional ES6 code
--

1. Lets use es6 to make our code more current.
    - using a fat arrow lets update our function

``
const App = () => {
    return <div>Hi!</div>;
}
``

## Component Structure
--