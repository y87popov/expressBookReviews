const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
    let userswithsamename = users.filter((user) => {
        return user.username === username
    });
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}
// Task 6 Register a new user
public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if (!doesExist(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registred. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register user." });
});

// Task1 - Get the book list available in the shop
public_users.get('/', function (req, res) {
    res.send(JSON.stringify({ books }, null, 4))
});

// Task2 - Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn])
});

// Task3 - Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    filtered_authors = {};
    for (let x = 1; x <= 10; x++) {
        if (books[x]["author"] == author) {
            filtered_authors[x] = Object.assign({}, books[x]);
        }
    }
    res.send(filtered_authors);
});

// Task4 Get book details based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here

    const title = req.params.title;
    filtered_titles = {};
    for (let x = 1; x <= 10; x++) {
        if (books[x]["title"] == title) {
            filtered_titles[x] = Object.assign({}, books[x]);
        }
    }
    res.send(filtered_titles);
});

// Task5 Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    isbn = req.params.isbn;
    let reviewsByIsbn = books[isbn]["reviews"];
    res.send(reviewsByIsbn);
});

// Task 10 Getting the list of books using Promise
public_users.get('/books', function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({ books }, null, 4)));
    });
    get_books.then(() => console.log("Promise for Task 10 resolved"));
});

// Task 11 Getting the book details based on ISBN using Promise
public_users.get('/isbnbypromise/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const get_isbn = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify((books[isbn]), null, 4)));
    });
    get_isbn.then(() => console.log("Promise for Task 11 resolved"));
});

// Task12 Getting the book details based on Author using promise
public_users.get('/authorbypromise/:author', function (req, res) {
    const author = req.params.author;
    filtered_authors = {};
    for (let x = 1; x <= 10; x++) {
        if (books[x]["author"] == author) {
            filtered_authors[x] = Object.assign({}, books[x]);
        }
    }
    const get_author = new Promise((resolve, reject) => {
        resolve(res.send(filtered_authors));
    });
    get_author.then(() => console.log("Promise for Task 12 resolved"));
});

// Task 13 Getting the book details based on Title using promise
public_users.get('/titlebypromise/:title', function (req, res) {
    const title = req.params.title;
    filtered_titles = {};
    for (let x = 1; x <= 10; x++) {
        if (books[x]["title"] == title) {
            filtered_titles[x] = Object.assign({}, books[x]);
        }
    }
    const get_title = new Promise((resolve, reject) => {
        resolve(res.send(filtered_titles));
    });
    get_title.then(() => console.log("Promise for Task 13 resolved"));
});

module.exports.general = public_users;
