exports.up = function(knex) {
    return knex.schema.createTable('cars', table => {
        table.increments('id')
        table.text('vin').unique().notNullable()
        table.text('make').notNullable()
        table.text('model').notNullable()
        table.decimal('mileage').notNullable() // should it be decimal?
        table.text('title').defaultTo(null)
        table.text('transmission').defaultTo(null)
    });
}

exports.down = function(knex) {
return knex.schema.dropTableIfExists('cars');
}
