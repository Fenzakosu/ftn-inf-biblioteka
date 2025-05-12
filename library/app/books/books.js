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

    if (localStorage.getItem("books")) {
        books = JSON.parse(localStorage.getItem("books"))
    }
    else {
        books = [
            { id: "1", title: "Knjiga 1", date: "2022", url: "../images/download.jpg", description: "Opis knjige 1", popularity: 4, rented: true },
            { id: "2", title: "Knjiga 2", date: "2021", url: "../images/download.jpg", description: "Opis knjige 2", popularity: 5, rented: false },
            { id: "3", title: "Knjiga 3", date: "2020", url: "../images/download.jpg", description: "Opis knjige 3", popularity: 3, rented: true },
            { id: "4", title: "Knjiga 4", date: "2019", url: "../images/download.jpg", description: "Opis knjige 4", popularity: 2, rented: false },
            { id: "5", title: "Knjiga 5", date: "2018", url: "../images/download.jpg", description: "Opis knjige 5", popularity: 5, rented: true }
        ];
        localStorage.setItem("books", JSON.stringify(books))
    }
    createBooksRow(books)
}

function createBooksRow(books) {
    let tableData = document.getElementById("books")
    tableData.innerHTML = ''
    for (let i = 0; i < books.length; i++) {
        let book = books[i];

        let tr = document.createElement('tr')

        let id = document.createElement('td')
        id.textContent = book.id

        let title = document.createElement('td')
        title.textContent = book.title

        let rmv = document.createElement('td')
        let removeBtn = document.createElement('button')
        removeBtn.textContent = 'Remove'

        removeBtn.addEventListener('click', function (event) {
            removeBook(book.id, books)
        })
        rmv.appendChild(removeBtn)
        tr.appendChild(id)
        tr.appendChild(title)
        tr.appendChild(rmv)
        tableData.appendChild(tr)

    }

}

function removeBook(id, books) {
    books = books.filter(item => item.id !== id);
    localStorage.setItem("books", JSON.stringify(books))
    location.reload();
    createBooksRow(books)
}

document.addEventListener('DOMContentLoaded', initializeBooks)

