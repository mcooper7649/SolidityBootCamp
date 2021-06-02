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

1. In this section we want to figure out the layout we want to use to structure our components

2. We may have a single component for
    - MAIN compoonent 
    - search bar
    - video player 
        - description
    We may have two comonents for
    - video gallery
        - individual video
        - list of videos (nested components)

3. React can handle many different components very fast all at once
    - This is why we prefer to design our app in individual pieces

4. Because we can create many different components we probably want to create a components folder to store them all, instead of our src folder

5. Next we want to create all the components we just went over in secion 2 (except MAIN).
    - search_bar.js
    - video_detail.js
    - video_list_item.js
    - video_list.js

## Youtube Search API Signup
--

[Google-Developers-Console](console.developers.google.com)

1. We are going to use real videos in our app
    - To do that we are going to signup to YouTube API
    - Once we've obtained a key we can install a small package that makes using it much simpler

2. Once your on the Dashboard
    - Click API Manager from the Left Panel
    - Create a key and copy it for the Youtube-Video-Data v3

3. Lets install a package that lets us interface with YouTubes API
    ``npm install youtube-api-search``

4. Before we configure the API package we are going to cover a few important topics and setup the searchbar
    - SearchBar
        - Features Needed
            - Text Box for a person to type in their search
            - Button that when pressed search for what they typed

        - Lets define our component the same way we did before
        - inside our block lets return <input />
            - this is a input box a user can type into
        - Even though we have no references to React in our component ALL components need to import react
            - this is needed due to transpiling
                - remember it creats React.createElement
        - To get search_bar rendered on index we need to export our code
            - ``export default SearchBar``
            - Any file that imports SearchBar can use the component now
                - remember, with libraries we don't need to import the relative file path
                - But with files we create, like components, we need specify the path
            - ``import SearchBar from './components/search_bar'``
        - Lets add our <SearchBar /> component into our app next
        
## Class Based Components
---
                    

- Before we can move on we need to learn about another type of component, the class component
    - What is the class component?
        - When you want it to have some type of internal record keeping
        - One that keeps track of itself and is aware of itself its been rendered
        - We can upgrade our search_bar to have a class using es6
        - lets refactor our search_bar
            - first remove the old code (leave the import/export)
            - type ``class SearchBar {}``
            - It a JS object
        - This will allow us to extend its behavior
            ``extends React.Compoonent``
            - If we add { Component }
        - We still need to get it to return something, one of the native methods of the React.Component is render
            ``render(){}``
        - We want to add a return into the block with our <input /> jsx
        
## Handling User Events
--

1. We converted our SearchBar from a functioncal Component to a Class Component in our last module, so we can add additional functionality.
    - We are going to be adding that functionality now.

2. When the user interacts with a browser they are constantly creating events, clicking, typing, moving mouse, are commong events.

3. There are two things we want to know about our SearchBar
    - We want to know when a user types something
    - We also want to know what they typed

4. First we need to declare an event handler
    - Our event handler is a function that should be ran whenever the event occurs
        - onInputChange or handleInputChange are common
    - Next we pass the event handler to the element want to monitor for events
        - using the onChange={} and pass a reference the event handler
        - ``turn <input onChange={this.onInputChange}/>;``
    - So in our case, we want to know whenever the input element has its text changed

5. onInputChange needs be passed an EVENT
    - We can use e, event, eventObject as they are the most common
    - The event object describes the context or info about the event that occurred.
    - console.log(event.target.value) to see what is being passed
    - console.log(event) to see all the event properties

    ```
    import React, { Component } from 'react';


    class SearchBar extends Component {
        render(){
            return <input onChange={this.onInputChange}/>;
        }

        onInputChange(event){
        console.log(event.target.value)
        }
    }

    export default SearchBar;
    ```

6. Refactor it
    - We can use an arrow function to refactor our code into just the return line
    - we then delete the onInput Change function as we don't need it anymore
    - Then we can remove the () around event, when its the only argument being passed

```
import React, { Component } from 'react';


class SearchBar extends Component {
    render(){
        return <input onChange={event  => console.log(event.target.value)}/>;
    }

}

export default SearchBar;
```

## Introduction to State
--

1. What is State?
    - One of the hardest concepts to understand in React
    - A plain Javascript Object that is used to record and react to user events
    - each class based component has its own state object
        - Whenever the component state changes, it immedaitely rerenders
        - This also causes its children to rerender as well
        - Before we ever use state inside of a component
            - We NEED to initialize the state objects
            - We set the property STATE to a plain javascript object inside the classes constructor method
            

2. Breaking down the State
    - All JavaScript CLASSES have a constructor function
        - This function is the first and only function called automatically whenever a new instance of the classes created
        
    - What is super?
        - Well come back to this
        - we need to pass props into super
        
    - To create a state we need to initialize it by typing
        ``this.state = {term: ''};``

3. Updating the state is different then creating.
    - Only in the constructor will you see this.state =
    - Everywhere else you will see this.setState = {}

```
return <input onChange={event  => this.setState({ term: event.target.value })}/>;

```

## Controlled Components
--

1. We are going to take the idea of state one step further and create a controlled field.

2. This is a field, similiar to the <input> but the field is set by the state.

3. Lets break the input tag up and add another property value
```
    <div>
        <input 
            value={this.state.term}
            onChange={event  => this.setState({ term: event.target.value})} />
    </div>
```

4. lets remove the onChange property next 
     - if we type now into the input we can't type at all
     - put the onChange back
     - This basically shows you how we can input a value that is bound to the state, and that state is bound to the Event


## Review
--

1. Things we've covered
    - JSX
    - Components
    - State
    - ES6
        - Classes
        - Arrow Functions
        - Import/Export Statements
    - Youtube API
    
2. Apps Structure
    - Inside our index.js we have our base Component call APP
        - we then import our SearchBar
        - Add it to render inside the APP
        - Our App is a Functional Component
            - We could if we wanted add a class based component inside our App

3. SeachBar Component Strucutre
    - Makes use of State by updating the users input whenever the state chagnes
    - Whenever a user changes some text we first update the state
    - Which causes the component to render
    - We made the input element a controlled component by telling it to retreive its value from state


## Youtube Search Response
-- 

1. We want to get some actual API searches in this module by using our Youtube API key

2. We need to make a YouTube Call to get a list of videos

3. Then we need to take that return/response and display it

4. Downwards DataFlow
    - This means only the most parent component inside the application should be responsible for fetching the data
    - Whether from an API or Redux or another framework, it needs to come form the parent component
    - Our Top Level Component is App

5. Import YTSearch like this
    ``import YTSearch from 'youtube-api-search';``

    - Call the YTSearch() passing an object like this as our first argument
    ``YTSearch({key: API_KEY, term: 'surfboards'})``

    - Next we need to pass a function as our second argument
        - this anonymous function takes our data and from our first argument query

    - If we log our data wee can see all the videos we searched for


## Refactoring Functional Components to Class Components
--

1. In order to pass our data from APP, a functional component into our Downwards Dataflow we need to convert App into a Class Component

2. First lets add { Component } to our React Import

3. Next instead of defining App with Const, we change it to class

```
class App extends Component {
    render(){
        return (
            <div>
                <SearchBar />
            </div>
        )
    }
}
```

4. We want to update the search term whenever a user types a new search query in
    - We can use STATE to do this
    - We need to setup a constructor function inside our APP, above the render
    ```
    constructor(props){
        super(props);

        this.state = {}
    }
    ```
    - In our last module we used Term to store the query of the state for our search word.
    - This time we want to use a word to describe the videos were searching for, lets use videos
    - lets put an empty array as the value, as we will retreive back an array of videos

## Props
--

Now that we got our state configured for YTSearch we can pass our video data to our video_list using props

1. First lets prepare our video_list.js by importing react and creating videoList fat arrow function

```
import React from 'react';

const VideoList = () => {
    
}

```

2. Next lets add into the return a <ul> and we add a the bootstrap className "col-md-4 list-group "

3. Export default VideoList so we can use it

4. Import our VideoList to our index.js

5. Inside  our App.js, we can pass our state as a prop adding 
``<VideoList videos={this.state.videos} />``

6. If your component that is working with your prop is functional we will pass it using:
    - this.props.videos.length

7. If your component that is working with your prop is a class based component we will pass it using:
    - props.videos.length



## Building Lists with MAP
--

1. In the past we used for Loops to iterate arrays, we want to use MAP moving forward.

2. This is a built in Helper, its a property of an array.

3. Map will allow us to run a function on each item in the array

4. This functionaly allows us to pass JSX and add it to each element in an array.


## List Item Keys
--

1. When working with an Array of items of the same type, each child in that array will need a keyprop created or it will throw an error

2. We can tap into the items.etag to get unique key id that youtube already generates for each video
``key={video.etag}``

3. now we don't have any console errors.

## Video List Items
--

1. Inside our props we have a set of properties available from our youtube videos.

2. By creating some basic bootrap layouts we can tap into the props of the imageURL
``const imageUrl = video.snippet.thumbnails.default.url;``

3. We can also assign the video props to video
``const video = props.video;``

4. This lets us display the title of the video and thumbnail image easily.

```
import React from 'react';

const VideoListItem = (props) => {
const video = props.video;

    const imageUrl = video.snippet.thumbnails.default.url;
        return (
            <li className="list-group-item">
            <div className="video-list media">
            <div className="media-left">
            <img className="media-object" src={imageUrl} />
            </div>

            <div className="media-body">
                <div className="media-heading">
                    {video.snippet.title}
                </div>
            </div>
            </div>

            </li>
        );
};

export default VideoListItem
```


## Detail Compoonent and Template Strings
--

1. Lets first configure the VideoDetail basics 
    - import react
    - VideoDetail fat arrow
    - export default VideoDetail

2. If we use es6 and replace props with {video} it will return just the videos

3. Lets add the title JSX to our divs to add a title and descriptions
```
<div>{videos.snippet.title}</div>
<div>{videos.snippet.description}</div>
```

4. Lets assign videoID to the property video.id.videoId;
    - Then we can set URL 
    ``const url = 'https://www.youtube.com/embed/' + videoId``

5. Lets use some ES6 syntax on this as its more commonly found way of using string interpolation
```
    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;
```                            

6. Lets add the {url} we just created as the src for our iframe

7. go Back to our APP or injex.js file and add our <VideoDetail /> component after our Searchbar


## Handling NUll Props
--

1. We want to pass a specific video to our VideoDetail Component
    - for our props we will pass video={this.state.videos[0]}
        - If you check the console we get an error "Can't read property ID of undefined"
        - This is due to this.state trying to access an arrray that is still empty because we haven't got our response back from YT
        
2. Lets add a if statemenet that returns Loading... while we wait for our props to load.
```
  if(!video) {
        return <div>Loading....</div>
    }
```


## Video Selection
--

1. When we pass our props through a component we dont have to use a format like video = props.video; to tap into video
    - we can {video, onVideoSelect} to be able to call upon those directly without calling on props

2. using that infomration lets create an onClick function for our <li> tag in the videolistitem.js

3. Inside that fucntion we will pass the onVideoSelect function that will update our state and rerender our thumbnail with the image of the video from the videolist we just clicked on.

4. This was an example of how we can pass around callbacks, try not to go to deep with this as it can be difficult for team members to understand if they join the project later on.


## Styling with CSS
--

This next section we are just adding our CSS stylings. 

```
.search-bar {
    margin: 20px;
    text-align: center;
}

.search-bar input {
    width: 75%;
}

.video-item img {
    max-width: 64px;
}

.video-detail .details {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.list-group-item {
    cursor: pointer;
}

.list-group-item:hover {
    background-color: #eee;
}

```

## Searching for Videos
--

1. We want to add the ability to search for new videos.
    - Using a callback we can achieve this
    
2. First lets create a function called videoSearch and pass(term)
    - inside the body we will move our search code

3. We can create onSearchtermChange as a callback prop to searchbar, which then takes our term and updates our videoSearch

4. Inside the search_bar.js lets  update our onChange that passes that event data to our onInputChange and updates the term and setState and rerenders

## Throttling the Search Term Input
--

1. we can see that now when we type it seems to be lagging and update a lil too  frequently.

2. We want to use lodash, to slow down how fast our function is called

3. npm i lodash

4. import _ from 'lodash';

5. const videoSearch = _.debounce((term) => { this.videoSearch(term), 300})


