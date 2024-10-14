const inquirer = require('inquirer');

const client = require('../config/db');

async function viewAllEmployees() {
    const result = await client.query('SELECT * FROM employee');
    console.table(result.rows);
}

async function addEmployee(first_name, last_name, role_id, manager_id) {
    await client.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
        [first_name, last_name, role_id, manager_id]
    );
    console.log(`Added ${first_name} ${last_name} to the database`);
}

async function updateEmployeeRole(employee_id, role_id) {
    await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
    console.log('Updated employee\'s role');
}

async function updateEmployeeManager(employee_id, manager_id) {
    await client.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [manager_id, employee_id]);
    cconsole.log('Updated employee\'s manager');
}

async function deleteEmployee(employee_id) {
    await client.query('DELETE FROM employee WHERE id = $1', [employee_id]);
    console.log('Deleted employee from the database');
}

async function viewEmployeesByManager() {
   
    const managers = await client.query('SELECT * FROM employee WHERE manager_id IS NULL');
    const managerChoices = managers.rows.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id }));
    const { manager_id } = await inquirer.prompt({
      type: 'list',
      name: 'manager_id',
      message: 'Select the manager:',
      choices: managerChoices
    });
  
    const result = await client.query(`
      SELECT e.id, e.first_name, e.last_name, m.first_name AS manager_first_name, m.last_name AS manager_last_name
      FROM employee e
      LEFT JOIN employee m ON e.manager_id = m.id
      WHERE e.manager_id = $1
    `, [manager_id]);
  
    console.table(result.rows);
  }
  
  async function viewEmployeesByDepartment() {
  
    const departments = await client.query('SELECT * FROM department');
    const departmentChoices = departments.rows.map(department => ({ name: department.name, value: department.id }));
  
    const { department_id } = await inquirer.prompt({
      type: 'list',
      name: 'department_id',
      message: 'Select the department:',
      choices: departmentChoices
    });
  
    const result = await client.query(`
      SELECT e.id, e.first_name, e.last_name, d.name AS department_name
      FROM employee e
      JOIN role r ON e.role_id = r.id
      JOIN department d ON r.department_id = d.id
      WHERE d.id = $1
    `, [department_id]);
  
    console.table(result.rows);
  }
  
  module.exports = {
    viewAllEmployees,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    deleteEmployee,
    viewEmployeesByManager,
    viewEmployeesByDepartment }