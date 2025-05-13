class Book {
    constructor(id, title, date, url, description, popularity, rented) {
        this.id = id
        this.title = title
        this.date = date
        this.url = url
        this.description = description
        this.popularity = popularity
        this.rented = rented
    }
}

function initializeBooks() {

    let books = []
    let rentedBooks = []
    let availableBooks = [];

    if (localStorage.getItem("books")) {
        books = JSON.parse(localStorage.getItem("books"))
    }

    for (let book of books) {
        if (book.rented) {
            rentedBooks.push(book)
        }
        else {
            availableBooks.push(book)
        }
    }
    localStorage.setItem("rentedBooks", JSON.stringify(rentedBooks))
    localStorage.setItem("availableBooks", JSON.stringify(availableBooks))
    createBooksRow(rentedBooks)
    createAvailableBooksRow(availableBooks)
}


function createBooksRow(rentedBooks) {
    let tableData = document.getElementById("rented-books")
    tableData.innerHTML = ''

    addTableHeaders(tableData)

    for (let i = 0; i < rentedBooks.length; i++) {
        let book = rentedBooks[i];

        let tr = document.createElement('tr')

        let id = document.createElement('td')
        id.textContent = book.id

        let title = document.createElement('td')
        title.textContent = book.title

        let date = document.createElement('td')
        date.textContent = book.date

        let url = document.createElement('td')
        url.textContent = book.url

        let description = document.createElement('td')
        description.textContent = book.description

        let popularity = document.createElement('td')
        popularity.textContent = book.popularity

        let rented = document.createElement('td')
        rented.textContent = book.rented ? "YES" : "NO"

        let rtn = document.createElement('td')
        let returnBtn = document.createElement('button')
        returnBtn.textContent = 'Return'

        returnBtn.addEventListener('click', function (event) {
            returnBook(book.id, rentedBooks)
        })
        rtn.appendChild(returnBtn)
        tr.appendChild(id)
        tr.appendChild(title)
        tr.appendChild(date)
        tr.appendChild(url)
        tr.appendChild(description)
        tr.appendChild(popularity)
        tr.appendChild(rented)
        tr.appendChild(rtn)
        tableData.appendChild(tr)

    }

}

function addTableHeaders(tableData) {
    let trH = document.createElement('tr')

    let idH = document.createElement('th')
    idH.textContent = "Br"
    let titleH = document.createElement('th')
    titleH.textContent = "Title"
    let dateH = document.createElement('th')
    dateH.textContent = "Date"
    let urlH = document.createElement('th')
    urlH.textContent = "URL"
    let descriptionH = document.createElement('th')
    descriptionH.textContent = "Description"
    let popularityH = document.createElement('th')
    popularityH.textContent = "Popularity"
    let rentedH = document.createElement('th')
    rentedH.textContent = "Rented"

    trH.appendChild(idH)
    trH.appendChild(titleH)
    trH.appendChild(dateH)
    trH.appendChild(urlH)
    trH.appendChild(descriptionH)
    trH.appendChild(popularityH)
    trH.appendChild(rentedH)
    tableData.appendChild(trH)
}

function createAvailableBooksRow(availableBooks) {
    let tableData = document.getElementById("available-books");
    if (!tableData) return;
    
    tableData.innerHTML = '';
    for (let i = 0; i < availableBooks.length; i++) {
        let book = availableBooks[i];

        let tr = document.createElement('tr');

        let id = document.createElement('td');
        id.textContent = book.id;

        let title = document.createElement('td');
        title.textContent = book.title;

        let rent = document.createElement('td');
        let rentBtn = document.createElement('button');
        rentBtn.textContent = 'Rent';
        rentBtn.className = 'rent-btn';

        rentBtn.addEventListener('click', function(event) {
            rentBook(book.id, availableBooks);
        });
        
        rent.appendChild(rentBtn);
        tr.appendChild(id);
        tr.appendChild(title);
        tr.appendChild(rent);
        tableData.appendChild(tr);
    }
}

function rentBook(id) {
    let books = JSON.parse(localStorage.getItem("books")) || []
    const bookIndex = books.findIndex(book => book.id === id)
    
    if (bookIndex !== -1) {
        books[bookIndex].rented = true
        localStorage.setItem("books", JSON.stringify(books))
        initializeBooks() // Refresh both tables
    }
}

function returnBook(id) {
    let books = JSON.parse(localStorage.getItem("books")) || []
    const bookIndex = books.findIndex(book => book.id === id)
    
    if (bookIndex !== -1) {
        books[bookIndex].rented = false
        localStorage.setItem("books", JSON.stringify(books))
        initializeBooks() // Refresh both tables
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeBooks();    
});