let Employee = require("./Employee");

class Manager extends Employee{
    constructor(officeNumber){
        this.officeNumber = officeNumber;

        super(name, id, email)
         
    }


    getRole = () => {return "Manager"};
    getOfficeNumber = () => {return this.officeNumber}
}
module.exports = Manager;