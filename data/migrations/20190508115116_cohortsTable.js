
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(tbl) {
    // primary id
    tbl.increments();
    //new field
    tbl
      .string('name', 128) // creates field called 'name', that is a text field w/a 128 word count limit
      .notNullable() // makes the field required

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
