const inquirer = require('inquirer');

async function homeMenu() {
    const choices = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View all Departments',
                'View All Roles',
                'View All Employees',
                'View Employees by Manager',
                'View Employees by Department',
                'View Budget for Department',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'Delete Department',
                'Delete Role',
                'Delete Employee',
                'Exit'
            ]        
        }
    ]);
    return choices.choice;
}

module.exports = {
    homeMenu
};