class Engineer {
    constructor(github){
        this.github = github;
    }
    getGithub = () => {return this.getGithub};
    getRole = () => {return "Engineer"};
}

module.exports = Engineer;