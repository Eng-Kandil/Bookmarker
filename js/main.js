var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var isValid = false;
var marksContainer = document.getElementById("marksContainer");
var booksArr = [];

var isBookmark = localStorage.getItem("booksArr");
if (isBookmark) {
  booksArr = JSON.parse(isBookmark);
  displayAllBookmarks();
  //   console.log(booksArr);
}

function createBookmark() {
    var bookmark;
    if(siteName.value==="" || siteUrl.value===""){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "please fill the inputs",

          });
          return;
    }
  if (isValid) {
   bookmark = {
    name: siteName.value,
    url: siteUrl.value,
  };
  booksArr.push(bookmark);
  handleLocalStorage();
  clearInputs();
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your Bookmark has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
  }
}

function handleLocalStorage() {
  localStorage.setItem("booksArr", JSON.stringify(booksArr));
  displayAllBookmarks();
}

function displayAllBookmarks() {
  var markContainer = "";
  if (booksArr.length === 0) {
    marksContainer.innerHTML  = "";
  }
  for (var i = 0; i < booksArr.length; i++) {
    markContainer += `
        <tr>
            <td>${i + 1}</td>
            <td>${booksArr[i].name}</td>
            <td>
                <button class="btn btn-success"> 
                <a href="${booksArr[i].url}" target="_blank">Visit</a>
                </button>
            </td>
            <td>
                <button onclick="deleteBookmMark(${booksArr.indexOf(
                  booksArr[i]
                )})"
                 class="btn btn-danger"> Delete</button>
            </td>
        </tr>
    `;
    marksContainer.innerHTML = markContainer;
  }
}

function deleteBookmMark(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your Bookmark has been deleted.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      booksArr.splice(index, 1);
      displayAllBookmarks();
      handleLocalStorage();
    }
  });
}

function clearInputs() {
  siteName.value = "";
  siteUrl.value = "";
  siteUrl.classList.remove("is-valid");
}

const urlRegex =
  /^((https?|ftp):\/\/)|(www.)(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
function startRegex(e) {
   isValid = urlRegex.test(e.value);
  if (e.value.length === 0) {
      siteUrl.classList.remove("is-invalid");
    return;
  }
  if (isValid) {
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
  } else {
    siteUrl.classList.remove("is-valid");
    siteUrl.classList.add("is-invalid");
  }
}


