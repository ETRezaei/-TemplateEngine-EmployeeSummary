const inquirer = require("inquirer");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const Manager = require("./Manager");
const Employee = require("./Employee");
var http = require("http");
var fs = require("fs");

// Set our port to 8080
var PORT = 8080;

let emplyees = [];

getUserInfo();
  async function getUserInfo(){

    const {position} = await inquirer.prompt([
    {
      type: "list",
      message: "Choose the position that you want to create the info card for!",
      name: "position",
      choices: [
        "Manager", 
        "Engineer", 
        "Intern",
        "No more employee"
      ]}
    ])

async function getEngineerInfo(){
    const {name, id, email, github} = await inquirer.prompt([
        {
            message: "What is your name?",
            name: "name"
        },
        {
            message: "What is your ID?",
            name: "id"
        },
        {
            message: "What is your email?",
            name: "email"
        },
        {
            message: "Enter your GitHub username",
            name: "github"
        }
    ])
    let engineer = new Engineer(name, id, email, github);
    emplyees.push(engineer);
    console.log(emplyees);
    getUserInfo();
}
async function getInternInfo(){
    const {name, id, email, school} = await inquirer.prompt([
        {
            message: "What is your name?",
            name: "name"
        },
        {
            message: "What is your ID?",
            name: "id"
        },
        {
            message: "What is your email?",
            name: "email"
        },
        {
            message: "What is your school",
            name: "school"
        }
    ])
    let intern = new Intern(name, id, email, school);
    emplyees.push(intern);
    getUserInfo();
}
async function getManagerInfo(){
    const {name, id, email, officeNumber} = await inquirer.prompt([
        {
            message: "What is your name?",
            name: "name"
        },
        {
            message: "What is your ID?",
            name: "id"
        },
        {
            message: "What is your email?",
            name: "email"
        },
        {
            message: "What is your office number",
            name: "officeNumber"
        }
    ])
    let manager = new Manager(name, id, email, officeNumber);
    emplyees.push(manager);
    getUserInfo();


}
switch (position) {

    case "Manager":
      return getManagerInfo();
        break;
    case "Engineer":
      return getEngineerInfo();
        break;
    case "Intern":
      return getInternInfo();
        break;
    case "No more employee":
        break;
    }
    

}

var server = http.createServer(handleRequest);

// Create a function for handling the requests and responses coming into our server
function handleRequest(req, res) {

  // Here we use the fs package to read our index.html file
  fs.readFile(__dirname + "/index.html", function(err, data) {
    // console.log(__dirname);
    if (err) throw err;
    // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
    // an html file.
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(emplyees)
    res.end(data);
  });
}

// Starts our server
server.listen(PORT, function() {
  console.log("Server is listening on PORT: " + PORT);
});