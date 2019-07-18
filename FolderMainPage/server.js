// Activating file reader and telling file to synch with additional.json file to sync words
var fs = require('fs');
var data = fs.readFileSync('additional.json');

// Parsing files in json to make more readable
var words = JSON.parse(data);
console.log(words);
const id_num = 1
console.log(words[id_num-1]['id']);
console.log(words[id_num-1]['email']);
console.log(words[id_num-1]['first_name']);
console.log(words[id_num-1]['last_name']);
console.log(words[id_num-1]['summary']);

console.log("Server is starting");

var express = require('express');
var app = express();
var server = app.listen(5000, listening);

function listening(){
    console.log("Listening at port 5000");
}


// express_serv keyword can be replaced with everything.
// express_serv is file location for where index.html is located.
app.use(express.static('express_serv'));
console.log("Restarted Web Server");

app.get('/add/:id/:email/:first_name/:last_name/:summary', addWord);

function addWord(request, response){
    var data = request.params;
    var id =  parseInt(data.id)-1;
    var email = data.email;
    var first_name = data.first_name;
    var last_name = data.last_name;
    var summary = data.summary;

    if (!id || !summary){
        var reply = "Must fill out all forms."
    }else{
        words[id] = {};
        //words[word] = score;
        words[id]['id'] = id+1;
        words[id]['email'] = email;
        words[id]['first_name'] = first_name;
        words[id]['last_name'] = last_name;
        words[id]['summmary'] = summary;

        var reply = {
            id: id,
            email: email,
            first_name: first_name,
            last_name: last_name,
            summary: summary,
            msg: "Thank you for input."
        }
        
        var data = JSON.stringify(words);
        fs.writeFile('additional.json', data, finished);
        
        function finished(err){
            console.log('all set');
        }
    }
    
    response.send(reply);
}

app.get('/all', sendAll);

function sendAll(request, response){
    var data = {
        additional: words, 
    }
    response.send(data);
}

app.get('/search/:word/', searchWord);

function searchWord(request, response){
    var word = request.params.word;
    var reply;
    if (words[word]){
        reply = {
            status: "word found in json",
            word: word,
            score: words[word]
        }
    }else{
        reply = {
            status: "not found",
            word: word
        }
    }
    response.send(reply);
}

