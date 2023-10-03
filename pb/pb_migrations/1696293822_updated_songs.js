/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ioxyydjaf3q82pr")

  // remove
  collection.schema.removeField("tmwh1sxf")

  return dao.saveCollection(collection)
})
