/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ioxyydjaf3q82pr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rlnalrnm",
    "name": "artist",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ioxyydjaf3q82pr")

  // remove
  collection.schema.removeField("rlnalrnm")

  return dao.saveCollection(collection)
})
