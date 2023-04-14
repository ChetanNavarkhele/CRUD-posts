// HTTP - xml
let cl = console.log;

let baseUrl = `https://jsonplaceholder.typicode.com/posts`;

// GET
// POST
// DELETE
// PATCH/PUT

// read all data
// read single data
// `${baseUrl}/:id`
// delete all data
// delete single data
// update single data.

let xhr = new XMLHttpRequest();             // 1) Create xhr object
xhr.open("GET",baseUrl,true);               // 2) configuration
xhr.onload = function(){cl(xhr.response)}   // 3) on response load
xhr.send();                                 // 4) send data

let xhr1 = new XMLHttpRequest();
xhr1.open("GET",baseUrl,true);
xhr1.onload = function(){
    cl(xhr1.response)
    cl(xhr1.status)
}
xhr1.send();

// xhr.status
// 200 or 202 :- Success
// 404 :- Not found
// 403 :- Forbidden
// 503 :- Service not available

// Bearer Token & JWT

// xhr.readyState
// 0 :- unsend - xhr object is created but open method is not yet called
// 1 :- open method is called
// 2 :- send method is called
// 3 :- loading - server is loading our request
// 4 :- done - request has been processed and response is ready (whether is a success or fail)


const postContainer = document.getElementById("postContainer");
const postForm = document.getElementById("postForm");
const titleControl = document.getElementById("title");
const contentControl = document.getElementById("content")

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

const templating = (arr) =>{
    let result = ``;
    arr.forEach(ele => {
        result +=       `
                        <div class="col-md-4 mb-4">
                            <div class="card">
                                <div class="card-header">
                                    <h3>
                                    ${ele.title}
                                    </h3>
                                </div>
                                <div class="card-body">
                                    <p>    
                                    ${ele.body}
                                    </p>
                                </div>
                                <div class="card-footer text-right">
                                    <button class="btn btn-primary">Edit</button>
                                    <button class="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                        `
    });
    postContainer.innerHTML = result;
}

function makeApiCall(methodName,apiUrl,body){
        let xhr = new XMLHttpRequest();
        xhr.open(methodName,apiUrl,true);
        xhr.onload = function(){
            if(xhr.status === 200 || xhr.status === 201){
                cl(xhr.response)
                let data = JSON.parse(xhr.response);
                if(methodName === "GET"){
                    templating(data)
                }
            }
        }
        xhr.send(body);
}
makeApiCall("GET", baseUrl);

const onPostSubmit = (eve) => {
    eve.preventDefault();
    let postObj = {
        title : titleControl.value,
        body : contentControl.value,
        userId : Math.floor(Math.random() * 10) + 1,
        id : uuid()
    }
    cl(postObj);
    makeApiCall("POST", baseUrl, JSON.stringify(postObj));
}




postForm.addEventListener("submit", onPostSubmit)