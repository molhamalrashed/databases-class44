function getPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
      `SELECT Population FROM ${Country} WHERE Name = '${name}' OR 1=1 and code = '${code}' OR 1=1`,
      function (err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  }

  // rewriting the functions so it is no longer vulnerable to sql injections using prepared statements 
  function getPopulation(Country, name, code, cb) {
    const sql = `SELECT Population FROM ${Country} WHERE name = ? and code = ? `;
    const values = [name, code];

    conn.execute(sql, values, function(er, result){
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
    })
  }