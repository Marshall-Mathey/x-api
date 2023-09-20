import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'messages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references("users.id").onDelete('CASCADE')
      table.string('title', 50).notNullable()
      table.text('content').notNullable()
      table.string('attachement', 120)
      table.integer('likes').notNullable().defaultTo(0)

      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
