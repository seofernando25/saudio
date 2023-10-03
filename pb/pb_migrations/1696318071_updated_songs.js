/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ioxyydjaf3q82pr")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ytuzizbu",
    "name": "audio",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 33554432,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ioxyydjaf3q82pr")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ytuzizbu",
    "name": "audio",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 25165824,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})
