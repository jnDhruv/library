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

// DOM
const booksGrid = document.getElementById("books-grid-area");

const red = "#dc2626";
const green = "#16a34a";

// dialog form elements
const newBookBtn = document.querySelector("#add-book");
const dialogBox = document.querySelector("dialog");
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const isReadInput = document.querySelector("#isRead");
const submitBtn = document.querySelector("#submitBtn");

function renderBooks() {
    if (library.length === 0) {
        booksGrid.replaceChildren();

        const emptyLibText = document.createElement("h3")
        emptyLibText.textContent = "Click on '+' to add a book";
        emptyLibText.classList.add("empty-grid-placeholder");
        booksGrid.appendChild(emptyLibText);
        return;
    }

    booksGrid.replaceChildren();
    
    for (let i = 0; i < library.length; i++) {
        const bookCard = createCardObject(library[i], i);
        booksGrid.appendChild(bookCard);
    }
}

function createCardObject(BookObj, index) {
    
    const cardElement = document.createElement("div");
    cardElement.classList.add("book-card");
    cardElement.dataset.index = index;

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

    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = `<img src="icons/close.svg" alt="remove">`;
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", () => {
        library.splice(cardElement.dataset.index,1);
        renderBooks();
    });
    cardElement.appendChild(removeBtn);

    return cardElement;
}

newBookBtn.addEventListener("click", () => {
    dialogBox.showModal();
});

form.addEventListener("submit", () => {
    addToLibrary(titleInput.value, authorInput.value, pagesInput.value, isReadInput.checked);
    renderBooks();
    dialogBox.close();
    form.reset();
});

const closeDiagBtn = document.querySelector(".close-btn");
closeDiagBtn.addEventListener("click", () => {
    dialogBox.close();
});

dialogBox.addEventListener("close", () => {
    form.reset();
});

renderBooks();