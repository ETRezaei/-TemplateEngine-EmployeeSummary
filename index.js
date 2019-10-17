const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const Employee = require("./lib/Employee");
var fs = require("fs");


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
    console.log(emplyees);
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
    console.log(emplyees);
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
        console.log(html(emplyees));
        fs.writeFile("index.html", html(emplyees), function(err) {

            if (err) {
            return console.log(err);
            }
        
            console.log("Success!");
        
        });
        break;
    }
    

}
let html = function(data){
    return `
<!DOCTYPE html>
<html>
<head>
  <title>Page</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

</head>
<body>
    <style>
        .ul{
            list-style-type:none;
            right: -200px;
            position: relative;
        }
        li{
            float: left;
            margin-left: 20px;
        }
        .cardbody{
            width: 200px;
        }
    </style>
	<div class="jumbotron" style="background: #f06292" > 
		<h1 class="text-center" >My Team</h1>
    </div>
    <ul class="ul">
        
    ${getContent(data)}
        
    </ul>
</body>
</html>
`
}
function getContent(data){
    console.log("getContent called")
    return data.map(obj =>{ 
        let position = obj.getRole();
        console.log(position);
        switch(position){
            case "Manager":
                return getManagerCard(obj);
                break;
            case "Engineer":
                return getEngineerCard(obj);
                break;
            case "Intern":
                return getInternCard(obj);
                break;
        }
            
    }).join('\n')
}

function getManagerCard(obj){
    console.log(obj.name);

    let mangerCard = 
    `
    <li>
    <div class="col-md-3">
    <div class="card cardbody">
      <div class="card-header" style="background: #90caf9">
                   ${obj.name}<br>
                   <div class="fa fa-fighter-jet">${obj.getRole()}</div>
                  </div>
      <div class="card-body">
        <form role="form">			
          <div class="form-group">
              <label for="reserve-unique-id" id="reserve-unique-id">ID: ${obj.id}</label>
          </div>
          <div class="form-group">
            <label for="reserve-email" id="reserve-email">Email: ${obj.email}</label>
          </div>
          <div class="form-group">
              <label for="reserve-phone" id="reserve-office-number">Office Number: ${obj.officeNumber}</label>					
          </div>				
          </form>
      </div>
    </div>
  </div>
  </li>
  `
  console.log(mangerCard);
  return mangerCard
}
function getEngineerCard(obj){
    let engineerCard = 
    `
    <li>
    <div class="col-md-3">
    <div class="card cardbody">
    <div class="card-header" style="background: #90caf9">
                ${obj.name} <br>
               <div class="fa fa-android"> ${obj.getRole()}</div>
                </div>
    <div class="card-body">
        <form role="form">			
        <div class="form-group">
            <label for="reserve-unique-id" id="reserve-unique-id">ID: ${obj.id}</label>
        </div>
        <div class="form-group">
            <label for="reserve-email" id="reserve-email">Email:${obj.email} </label>
        </div>
        <div class="form-group">
            <label for="reserve-phone" id="reserve-github">GitHub: ${obj.github}</label>					
        </div>				
        </form>
    </div>
    </div>
</div>
<li>
    `
    return engineerCard
}
function getInternCard(obj){
    let internCard = 
    `
    <li>
    <div class="col-md-3">
				<div class="card cardbody">
				  <div class="card-header" style="background: #90caf9">
							   ${obj.name}<br>
							  <div><i class="fa fa-trophy"></i> ${obj.getRole()}</div>
							  </div>
				  <div class="card-body">
					<form role="form">			
					  <div class="form-group">
						  <label for="reserve-unique-id" id="reserve-unique-id">ID:${obj.id} </label>
					  </div>
					  <div class="form-group">
						<label for="reserve-email" id="reserve-email">Email: ${obj.email}</label>
					  </div>
					  <div class="form-group">
						  <label for="reserve-phone" id="school">School: ${obj.school}</label>					
					  </div>				
					  </form>
				  </div>
				</div>
              </div>
              <li>

    `
    return internCard
}


  