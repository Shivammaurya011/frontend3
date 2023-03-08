let rows = document.getElementById("rows");
function load() {
  rows.innerHTML = ''
  var MySearchdata = JSON.parse(localStorage.getItem("bookData"))||[];
  if (MySearchdata == null) {
    rows.innerHTML = "No history";
  } else{ 
    var his=MySearchdata.map((item) => {
      return `<div id='row'>
            <div id='searchText'>${item.search}</div> 
            <div id='dateTime'>Search on : ${item.date} at ${item.time}</div>
            </div>
            <div id="rows1"></div>
            `;
      
    });
  }
  rows.innerHTML = his;
}
load();

document.getElementById("row").addEventListener("click", () => {
  handleHistClick()
});
var input1 = 'java';
let url1 = "https://www.googleapis.com/books/v1/volumes?q="
function handleHistClick(){
  
  var filter = input1.toUpperCase();
    fetch(`${url1}+${input1}`)
    .then((response) => response.json())
    .then((data) => {
        var bookdata = data.items;
        var res = bookdata.map( book => {
            if (book.volumeInfo.title.toUpperCase().includes(filter)) { 
                check=true; 
                return `<div class="card1" id="card">
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
       document.getElementById("rows1").innerHTML = res;
      })
  console.log('Hello')
}
function handleClear(){
  localStorage.removeItem("bookData");
  location.reload();
  document.getElementById("rows").className = "hide";
  alert("History Clear.")
}