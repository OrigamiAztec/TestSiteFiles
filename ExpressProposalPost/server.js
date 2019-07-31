// Activating file reader and telling file to synch with additional.json file to sync words
var fs = require('fs');
var data = fs.readFileSync('additional.json');

// Parsing files in json to make more readable
var words = JSON.parse(data);
//console.log(words);

const id_num = 1
console.log('First objects in file: ');
console.log(words[id_num-1]['id']);
console.log(words[id_num-1]['email']);
console.log(words[id_num-1]['first_name']);
console.log(words[id_num-1]['last_name']);
console.log(words[id_num-1]['summary']);

//console.log("Server is starting");

var express = require('express');
var app = express();
var server = app.listen(5000, listening);

function listening(){
    //console.log("Listening at port 5000");
}


// express_serv keyword can be replaced with everything.
// express_serv is file location for where index.html is located.
app.use(express.static('express_serv'));
app.use(express.static('organized_student_viewer'));
//console.log("Restarted Web Server");

app.get('https://origamiaztec.github.io/TestSiteFiles/ExpressProposalPost/express-serv/add/:id/:email/:first_name/:last_name/:summary/:date/:undergrad_select/:grad_select/:faculty_select', addWord);

function addWord(request, response){
    var data = request.params;
    var id =  parseInt(data.id)-1;
    //console.log(id);
    var email = data.email;
    var first_name = data.first_name;
    var last_name = data.last_name;
    var summary = data.summary;
    var date = new Date();
    //console.log(date);
    var undergrad_select = data.undergrad_select;
    //console.log("Checkbox selections: ");
    //console.log(typeof(undergrad_select));
    var grad_select = data.grad_select;
    //console.log(grad_select)
    var faculty_select = data.faculty_select;
    //console.log(faculty_select);

    if (!id || !summary){
        var reply = "Must fill out all forms."
    }else{
        words[id] = {};
        //words[word] = score;
        words[id]['id'] = id+1;
        words[id]['email'] = email;
        words[id]['first_name'] = first_name;
        words[id]['last_name'] = last_name;
        words[id]['summary'] = summary;
        words[id]['date'] = date;
        words[id]['undergrad_select'] = undergrad_select;
        words[id]['grad_select'] = grad_select;
        words[id]['faculty_select'] = faculty_select;


        var reply = {
            id: id+1,
            email: email,
            first_name: first_name,
            last_name: last_name,
            summary: summary,
            date: date,
            undergrad_select: undergrad_select,
            grad_select: grad_select,
            faculty_select: faculty_select,
            msg: "Thank you for input."
        }
        
        var data = JSON.stringify(words);
        fs.writeFile('additional.json', data, finished);
        
        function finished(err){
            //console.log('all set');
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

