const inquirer = require('inquirer');

const { homeMenu } = require('./prompts/inquirerPrompts');

const { viewAllDepartments, addDepartment, deleteDepartment } = require('./services/departmentService');

const { viewAllRoles, addRole, deleteRole } = require('./services/roleService');

const { viewAllEmployees, 
        addEmployee, 
        updateEmployeeRole, 
        updateEmployeeManager, 
        deleteEmployee, 
        viewEmployeesByManager, 
        viewEmployeesByDepartment } = require('./services/employeeService');

const { viewBudget } = require('./services/budgetService');

const client = require('./config/db');

async function main() {
    let exit = false;
    while (!exit) {
        const choice = await homeMenu();

        switch (choice) {

            case 'View all Departments':
                await viewAllDepartments();
                break;

            case 'View All Roles':
                await viewAllRoles();
                break;

            case 'View All Employees':
                await viewAllEmployees();
                break;

            case 'View Employees by Manager':
                await viewEmployeesByManager();
                break;

            case 'View Employees by Department':
                await viewEmployeesByDepartment();
                break;

            case 'View Budget for Department':
                const departments = await client.query('SELECT * FROM department');
                const departmentChoices = departments.rows.map(department => ({
                    name: department.name,
                    value: department.id
                }));

                const { department_id: selectedDepartmentId } = await inquirer.prompt({
                    type: 'list',
                    name: 'department_id',
                    message: 'Select a department',
                    choices: departmentChoices
                });
                await viewBudget(selectedDepartmentId);
                break;

            case 'Add Department':
                const { name: departmentName} = await inquirer.prompt({
                    type: 'input',
                    name: 'name',
                    message: 'Enter department name'
                });
                await addDepartment(departmentName);
                break;

            case 'Add Role':
                const departmentsForRole = await client.query('SELECT * FROM department');
                const departmentChoicesForRole = departmentsForRole.rows.map(department => ({ name: department.name, value: department.id }));
                    
                const { title, salary, department_id:departmentIdForRole } = await inquirer.prompt([
                        { 
                        type: 'input',
                        name: 'title',
                        message: 'Enter role title'
                        },
                        { 
                        type: 'input',
                        name: 'salary',
                        message: 'Enter role salary'
                        },
                        { 
                        type: 'list',
                        name: 'department_id',
                        message: 'Select a department',
                        choices: departmentChoicesForRole
                        }

                    ]);
                    await addRole(title, salary, departmentIdForRole);
                    break;

                case 'Add Employee': 
                    const roles = await client.query('SELECT * FROM role');
                    const roleChoices = roles.rows.map(role => ({ name: role.title, value: role.id }));

                    const employees = await client.query('SELECT * FROM role');
                    const managerChoices = employees.rows.map(role => ({ name: role.title, value: role.id }));
                    managerChoices.push({ name: 'None', value: null });

                    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
                        { 
                        type: 'input',
                        name: 'first_name',
                        message: 'Enter employee first name'
                        },
                        { 
                        type: 'input',
                        name: 'last_name',
                        message: 'Enter employee last name'
                        },
                        { 
                        type: 'list',
                        name: 'role_id',
                        message: 'Select a role',
                        choices: roleChoices
                        },
                        { 
                        type: 'list',
                        name: 'manager_id',
                        message: 'Select a manager',
                        choices: managerChoices
                        }
                    ]);
                    await addEmployee(first_name, last_name, role_id, manager_id);
                    break;

                case 'Update Employee Role':
                    const employeesForUpdate = await client.query('SELECT * FROM employee');
                    const employeeChoicesForUpdate = employeesForUpdate.rows.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));

                    const rolesForUpdate = await client.query('SELECT * FROM role');
                    const roleChoicesForUpdate = rolesForUpdate.rows.map(role => ({ name: role.title, value: role.id }));

                    const { employee_id: employeeIdForRole, role_id: newroleId } = await inquirer.prompt([
                        { 
                        type: 'list',
                        name: 'employee_id',
                        message: 'Select an employee',
                        choices: employeeChoicesForUpdate
                        },
                        { 
                        type: 'list',
                        name: 'role_id',
                        message: 'Select a role',
                        choices: roleChoicesForUpdate
                        }
                    ]);
                    await updateEmployeeRole(employeeIdForRole, newroleId);
                    break;

                case 'Update Employee Manager':
                    const employeesForManagerUpdate = await client.query('SELECT * FROM employee');
                    const employeeChoicesForManagerUpdate = employeesForManagerUpdate.rows.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));

                    const mangerForUpdate = await client.query('SELECT * FROM employee');
                    const managerChoicesForUpdate = mangerForUpdate.rows.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));
                    managerChoicesForUpdate.push({ name: 'None', value: null });

                    const { employee_id: employeeIdForManager, manager_id: newManagerId } = await inquirer.prompt([
                        { 
                        type: 'list',
                        name: 'employee_id',
                        message: 'Select an employee',
                        choices: employeeChoicesForManagerUpdate
                        },
                        { 
                        type: 'list',
                        name: 'manager_id',
                        message: 'Select a manager',
                        choices: managerChoicesForUpdate
                        }
                    ]);
                    await updateEmployeeManager(employeeIdForManager, newManagerId);
                    break;

                case 'Delete Department':
                    const departmentsForDelete = await client.query('SELECT * FROM department');
                    const departmentChoicesForDelete = departmentsForDelete.rows.map(department => ({ name: department.name, value: department.id }));
                    const { department_id: departmentIdForDelete } = await inquirer.prompt([
                        { 
                        type: 'list',
                        name: 'department_id',
                        message: 'Select a department to delete',
                        choices: departmentChoicesForDelete
                        }
                    ]);
                    await deleteDepartment(departmentIdForDelete);
                    break;

                case 'Delete Role':
                    const rolesForDelete = await client.query('SELECT * FROM role');
                    const roleChoicesForDelete = rolesForDelete.rows.map(role => ({ name: role.title, value: role.id }));

                    const { role_id: roleIdForDelete } = await inquirer.prompt([
                        { 
                        type: 'list',
                        name: 'role_id',
                        message: 'Select a role to delete',
                        choices: roleChoicesForDelete
                        }
                    ]);
                    await deleteRole(roleIdForDelete);
                    break;

                case 'Delete Employee':
                    const employeesForDelete = await client.query('SELECT * FROM employee');
                    const employeeChoicesForDelete = employeesForDelete.rows.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));

                    const { employee_id: employeeIdForDelete } = await inquirer.prompt([
                        { 
                        type: 'list',
                        name: 'employee_id',
                        message: 'Select an employee to delete',
                        choices: employeeChoicesForDelete
                        }
                    ]);
                    await deleteEmployee(employeeIdForDelete);
                    break;

                case 'Exit':
                    exit = true;
                    break;
                default:
                    console.log('Invalid option');
                    break;
                }
            }
            client.end(); 
        }

        main().catch(console.error);

