
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl) {
    tbl.increments();

    tbl.string('name', 128)
      .notNullable();

    // joins this current table w the parent (cohort) table
    tbl
      .integer('cohort_id') //this references the cohort table
      .unsigned() // some DBMS needs this line
      .references('id') // the primary key in the parent table
      .inTable('cohorts') // the name of the parent table 
      .onDelete('CASCADE') // for if the joining id is deleted in the parent table
      .onUpdate('CASCADE')

      tbl.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
