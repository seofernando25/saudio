/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ioxyydjaf3q82pr")

  // remove
  collection.schema.removeField("tmwh1sxf")

  // add
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
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ioxyydjaf3q82pr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tmwh1sxf",
    "name": "blob",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "ec0mc8g5wadhohx",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("ytuzizbu")

  return dao.saveCollection(collection)
})
