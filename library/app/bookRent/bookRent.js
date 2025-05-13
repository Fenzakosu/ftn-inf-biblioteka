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