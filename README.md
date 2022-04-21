We use Knockout js for some of our projects.
https://knockoutjs.com/

In order to complete the following tasks is good to have a basic understanding of JS syntax and specifics, basic 
knowledge of HTML and CSS/LESS.

What you need to know beforehand:
- [Url structure](https://en.wikipedia.org/wiki/URL).
- [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
- [less](https://lesscss.org/)

For JS read about:
- `this` keyword
- `call()`, `apply()` and, `bind()` methods
- deferred
- promise


# Project information
Let's create a Web page that allows us to play the `Simple Hangman` from [js Intro/exercise-03.js].

Your project structure should be something like this:

    .
    ├── static
    │   ├── css
    │   │   └── static.css
    │   ├── less
    │   │   └── static.less
    │   ├── images
    │   ├── js
    │   └── fonts
    └── 
    index.html

For simplicity bootstrap and Knockout are already included in the project, also a utility function for generating alphabet.

# Tasks
##Make Hangman page
1. Transfer the Hangman game logic to `js/view-models/hangman.js`
2. Create a `div` element and bind the HangmanViewModel - it will contain all DOM elements of the game
3. Show the "word-to-be-guessed" on the page.
4. Show how many trys the user have.
5. Add buttons for every alphabet letter (something like a keyboard). Use the `getAlphabet()` utility function for this.
6. Call your `guessLetter()` when a letter button is clicked. 
   1. if the letter is found, the updated "word-to-be-guessed" should be shown to the user
   2. if the letter is not found user's trys should be updated
   3. if the user has no more trys or has won - show a success or failure message. Note that the user should not be able
   to click on the letter buttons anymore. 
   4. On failure, you should show the correct word to the user
7. Add a 'Play again' logic.
8. Bonus: 
   1. Play with styling your page.
   2. Add a dialog and show success/failure messages in it.

##Get random words
1. In order to make the game interest in long term we should be able to update the collection of words.
2. Let's make an API call for retrieving 50 words from http://random-word-api.herokuapp.com/home and use them as a base
collection
3. Bonus: Show a loading spinner on the page until the API call completes.

##One-page app
Let's have two pages:
   1. First page to contain a form where the user enters his first and last name. After submitting successfully the 
   form to be "redirected" to the second page
   2. On the second page visualize the game and add a greeting message "Hi {user's full name}. Are you ready to play?"
   3. You should redirect to the first page if the user hasn't submitted the form yet, but tries to access the second 
   one.

We will navigate through the pages using fragments.

In order to implement this you need to know:
1. How to show/hide elements
2. What is a `fragment` and how to check it has changed

**Bonus:** Reimplement page navigations using https://millermedeiros.github.io/crossroads.js/

