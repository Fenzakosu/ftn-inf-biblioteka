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

    if (localStorage.getItem("books")) {
        books = JSON.parse(localStorage.getItem("books"))
    }
    for (let book of books) {
        if (book.rented) {
            rentedBooks.push(book)
        }
    }
    localStorage.setItem("rentedBooks", JSON.stringify(rentedBooks))
    createBooksRow(rentedBooks)
}






function createBooksRow(rentedBooks) {
    let tableData = document.getElementById("rented-books")
    tableData.innerHTML = ''
    for (let i = 0; i < rentedBooks.length; i++) {
        let book = rentedBooks[i];

        let tr = document.createElement('tr')

        let id = document.createElement('td')
        id.textContent = book.id

        let title = document.createElement('td')
        title.textContent = book.title

        let rtn = document.createElement('td')
        let returnBtn = document.createElement('button')
        returnBtn.textContent = 'Return'

        returnBtn.addEventListener('click', function (event) {
            returnBook(book.id, rentedBooks)
        })
        rtn.appendChild(returnBtn)
        tr.appendChild(id)
        tr.appendChild(title)
        tr.appendChild(rtn)
        tableData.appendChild(tr)

    }

}

function returnBook(id, books) {

    // Niz dostupnih knjiga
    let availableBooks = []

    const index = books.findIndex(book => book.id === id)
    if (index !== -1) {
        const returnedBook = books.splice(index, 1)[0];
        returnedBook.rented = false
        localStorage.setItem("rentedBooks", JSON.stringify(books))
        availableBooks.push(returnedBook);
        // Ubacivanje vraćene knjige u niz dostupnih za iznajmljivanje
        localStorage.setItem("availableBooks", JSON.stringify(availableBooks))
        createBooksRow(books)
    }
}

document.addEventListener('DOMContentLoaded', initializeBooks)