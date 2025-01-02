const root = document.querySelector(":root");
const booksGrid = document.getElementById("books-grid-area");

const red = "#dc2626";
const green = "#16a34a";

const library = [];

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

function addToLibrary(title, author, pages, haveRead) {
    library.push(new Book(title, author, pages, haveRead));
}

function renderBooks() {
    booksGrid.replaceChildren();
    
    for (let i = 0; i < library.length; i++) {
        booksGrid.appendChild(createCardObject(library[i]));
    }
}

addToLibrary("ah", "ahh", 12, true);
renderBooks();


function createCardObject(BookObj) {
    
    const cardElement = document.createElement("div");
    cardElement.classList.add("book-card");

    let haveReadStr = BookObj.haveRead? "Yes":"No";
    cardElement.style.setProperty("--card-accent-color", BookObj.haveRead? green:red);

    cardElement.insertAdjacentHTML("beforeend", `
        <p class="book-title">${BookObj.title}</p>
        <p class="book-author">By <span class="author-name">${BookObj.author}</span></p>
        <p class="book-length">Pages: <span class="pages">${BookObj.pages}</span></p>
        <p class="book-read">Completed: <span class="read-status">${haveReadStr}</span></p>
        `
    );

    const statusSpan = cardElement.querySelector(".read-status");

    const toggleReadBtn = document.createElement("button");
    toggleReadBtn.innerHTML = `Mark As <span class="book-status">${BookObj.haveRead? "Unread":"Read"}</span>`;

    const toggleReadBtnSpan = toggleReadBtn.querySelector(".book-status");

    toggleReadBtn.addEventListener('click', () => {
        // Toggle the boolean
        BookObj.haveRead = !BookObj.haveRead;

        // Change elements according to new value of the boolean
        if (BookObj.haveRead) {
            cardElement.style.setProperty("--card-accent-color", green);
            statusSpan.textContent = "Yes";
            toggleReadBtnSpan.textContent = "Unread";
        } else {
            cardElement.style.setProperty("--card-accent-color", red);
            statusSpan.innerHTML = "No";
            toggleReadBtnSpan.textContent = "Read";
        }
    });
    cardElement.appendChild(toggleReadBtn);
    return cardElement;
}