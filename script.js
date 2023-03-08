var input = document.getElementById('search-bar');
let url = "https://www.googleapis.com/books/v1/volumes?q="
var check = false;
var bookData = new Array();
function search(){   
    var filter = input.value.toUpperCase();
    var bookcontainer = document.getElementById('bookcontainer');
    bookcontainer.innerHTML = '';
    fetch(`${url}+${input.value}`)
    .then((response) => response.json())
    .then((data) => {
        var bookdata = data.items;
        var books = bookdata.map( book => {
            if (book.volumeInfo.title.toUpperCase().includes(filter)) { 
                check=true; 
                return `<div class="card" id="card">
                            <img src=${book.volumeInfo.imageLinks.thumbnail.replace('http://','https://')} width="100%" alt="img" srcset="">
                            <div class="book-title" data-header><strong>Title</strong> : ${book.volumeInfo.title.slice(0, 5)}</div>
                            <div class="author" data-author><strong>Author </strong>: ${book.volumeInfo.authors.slice(0, 5)}</div>
                            <div class="pagecount"><strong>Page Count </strong>: ${book.volumeInfo.pageCount}</div>
                            <div class="publisher"><strong>Publisher </strong>: ${book.volumeInfo.publisher}</div>
                            <div><button id="buynow">Buy Now</button></div>
                        </div>
                    `
            }
       });
       if(check){
        let obj = {
            search: filter,
            date:new Date().toLocaleDateString(),
            time:new Date().toLocaleDateString('en-us',{
                hour:'2-digit',
                minute:'2-digit',
            }),
        }
        bookData.push(obj)
        localStorage.setItem('bookData' , JSON.stringify(bookData))
       }
    bookcontainer.innerHTML = books;
   })
   
   
}

function historydata(){
   window.location.href = "./history"
}