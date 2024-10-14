const client = require('../config/db');

async function viewAllDepartments() {
    const res = await client.query('SELECT * FROM department');
    console.table(res.rows);
}

async function addDepartment(name) {
    await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log(`Added ${name} to the database`);
}

async function deleteDepartment(department_id) {
    const roles = await client.query('SELECT * FROM role WHERE department_id = $1', [department_id]);

    if (roles.rows.length > 0) {
        console.log('Please delete or update roles associated with this department first.');
        return false;
    }

    await client.query('DELETE FROM department WHERE id = $1', [department_id]);
    console.log('Deleted department');
    return true;
}

module.exports = {
    viewAllDepartments,
    addDepartment,
    deleteDepartment
};