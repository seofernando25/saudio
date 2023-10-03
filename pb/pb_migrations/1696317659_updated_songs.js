/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ioxyydjaf3q82pr")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "elfcnrbr",
    "name": "isDownloading",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ioxyydjaf3q82pr")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "elfcnrbr",
    "name": "downloaded",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
