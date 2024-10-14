const client = require('../config/db');

async function viewAllRoles() {
    const res = await client.query('SELECT * FROM role');

    console.table(res.rows);
}

async function addRole(title, salary, department_id) {
    await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);

    console.log(`Added ${title} to the database`);
}

async function deleteRole(role_id) {
    const employees = await client.query('SELECT * FROM employee WHERE role_id = $1', [role_id]);

    if (employees.rows.length > 0) {
        console.log('Please update or remove employees associated with this role first.');
        return false;
    }

    await client.query('DELETE FROM role WHERE id = $1', [role_id]);

    console.log('Deleted role');
    return true;
}

module.exports = { viewAllRoles, addRole, deleteRole };