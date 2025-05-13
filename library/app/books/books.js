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

    addTableHeaders(tableData)

    for (let i = 0; i < books.length; i++) {
        let book = books[i];

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

        let rmv = document.createElement('td')
        let removeBtn = document.createElement('button')
        removeBtn.textContent = 'Remove'

        removeBtn.addEventListener('click', function (event) {
            removeBook(book.id, books)
        })
        rmv.appendChild(removeBtn)
        tr.appendChild(id)
        tr.appendChild(title)
        tr.appendChild(date)
        tr.appendChild(url)
        tr.appendChild(description)
        tr.appendChild(popularity)
        tr.appendChild(rented)
        tr.appendChild(rmv)
        tableData.appendChild(tr)

    }

}

function removeBook(id, books) {
    books = books.filter(item => item.id !== id);
    let rentedBooks = JSON.parse(localStorage.getItem("rentedBooks"))
    rentedBooks = rentedBooks.filter(item => item.id !== id);
    localStorage.setItem("books", JSON.stringify(books))
    localStorage.setItem("rentedBooks", JSON.stringify(rentedBooks))
    location.reload();
    createBooksRow(books)
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

function addNewBook(event) {
    event.preventDefault();
    
    const bookTitle = document.getElementById('bookTitle').value;
    const bookId = document.getElementById('bookId').value;
    const bookDate = document.getElementById('bookDate').value;
    const bookImage = document.getElementById('bookImage').value;      
    const bookDesc = document.getElementById('bookDescription').value;
    const bookPop = document.getElementById('bookPopularity').value;
    const bookType = document.getElementById('bookType').value;
    
    // Uzimanje postojećih knjiga iz localStorage
    let books = [];
    if (localStorage.getItem("books")) {
        books = JSON.parse(localStorage.getItem("books"));
    }
    
    // Provera da li knjiga sa istim ID-om već postoji
    if (books.some(book => book.id === bookId)) {
        alert('Knjiga sa ovim ID-om već postoji!');
        return;
    }
    
    // Kreiranje nove knjige sa podrazumevanim vrednostima
    const newBook = {
        title: bookTitle,
        id: bookId,        
        date: bookDate,
        url: bookImage, 
        description: bookDesc,
        popularity: bookPop,
        rented: false
    };
    
    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));   
    createBooksRow(books);       
    document.getElementById('bookForm').reset();  

}

document.addEventListener('DOMContentLoaded', function() {
    initializeBooks();
    
    const bookForm = document.getElementById('bookForm');
    if (bookForm) {
        bookForm.addEventListener('submit', addNewBook);
    }
});

