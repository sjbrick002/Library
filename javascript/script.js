let library = []

function book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

book.prototype.info = function() {return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "completed reading" : "not read yet"}`}

const addBtn = document.querySelector(".add-btn")
addBtn.addEventListener("click", addLibraryBook)
function addLibraryBook() {
    let title = prompt("What is the book's title?")
    let author = prompt("Who is the book's author(s)?")
    let pages = prompt("What is the book's page count?")
    let read = prompt("Have you read this book yet?", "y/n")
    read = (read === "y") ? true : false
    let novel = new book(title, author, pages, read)
    library.push(novel)
    console.log(library)
    exhibitLibrary()
}

const bookshelf = document.querySelector(".bookshelf")
function clearBookshelf(numberOfBooks) {
    console.log(numberOfBooks)
    for (let i = 0; i < numberOfBooks.length; i++) {
        numberOfBooks[i].remove()
    }
}

function exhibitLibrary() {
    let numberOfBooks = document.querySelectorAll(".book")
    clearBookshelf(numberOfBooks)
    library.forEach((novel) => {
        const tome = document.createElement("div")
        tome.classList.add("book")
        const tomeInfo = document.createElement("div")
        tomeInfo.classList.add("book-info")
        tomeInfo.textContent = novel.info()

        const tomeStatusBtn = document.createElement("button")
        tomeStatusBtn.classList.add("book-status")
        tomeStatusBtn.textContent = "Complete?"
        tomeStatusBtn.addEventListener("click", () => {
            novel.read = novel.read ? false : true
            tomeInfo.textContent = novel.info()
        })

        const removeBtn = document.createElement("div")
        removeBtn.classList.add("remove-btn")
        removeBtn.textContent = "remove"
        removeBtn.addEventListener("click", () => {
            tome.remove()
            let index = library.indexOf(novel)
            library.splice(index, 1)
        })

        tome.appendChild(tomeInfo)
        tome.appendChild(tomeStatusBtn)
        tome.appendChild(removeBtn)
        bookshelf.appendChild(tome)
    })
}