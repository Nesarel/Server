const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "sqlite.db";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    }
});

async function getTemplate() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM template", (err, rows) => {
            if (err) {
                reject(err)
                return;
            }
            resolve(rows)
        });
    })
}

async function getOneTemplate(id) {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM template WHERE id = ?", id, (err, rows) => {
            if (err) {
                reject(err)
                return;
            }
            resolve(rows)
        });
    })
}

async function createTemplate(title, data, user_id, token){
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO template (title, data, user_id, token) VALUES (?,?,?,?)", [title, data, user_id, token], (err) => {
            if (err) {
              reject(err)
              return;
            }
            resolve()
        });
    })
}

async function deleteTemplate(id){
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM template WHERE id = ?", id, (err) => {
            if (err) {
              reject(err)
              return;
            }
            resolve()
        });
    })
}

module.exports = {
    getTemplate,
    createTemplate,
    deleteTemplate,
    getOneTemplate
}