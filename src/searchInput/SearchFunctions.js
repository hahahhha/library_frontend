const findByYear = (books, year) => {
    let res = [];
    for (let i = 0; i < books.length; i++) {
        if ((books[i].year + '').startsWith(year)) {
            res.push(books[i]);
        }
    }
    return res;
}

const findByAuthor = (books, author) => {
    author = author.toLowerCase();
    let res = [];
    for (let i = 0; i < books.length; i++) {
        if (books[i].author.toLowerCase().includes(author)) {
            res.push(books[i]);
        }
    }

    return res;
}

const findByTitle = (books, title) => {
    let res = [];
    title = title.toLowerCase();
    for (let i = 0; i < books.length; i++) {
        if (books[i].title.toLowerCase().includes(title)) {
            res.push(books[i]);
        }
    }
    return res;
}

const findByKeeper = (books, word) => {
    let res = [];
    word = word.toLowerCase();
    for (let i = 0; i < books.length; i++) {
      console.log(books[i])
      if (books[i].keeper.toLowerCase().includes(word)) {
        res.push(books[i]);
      }
    }
    return res;
  }

export {
    findByTitle,
    findByAuthor,
    findByYear,
    findByKeeper
}