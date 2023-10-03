/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cbvs1btcdr0nnl2")

  // remove
  collection.schema.removeField("9r4xboug")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "87farary",
    "name": "name",
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
  const collection = dao.findCollectionByNameOrId("cbvs1btcdr0nnl2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9r4xboug",
    "name": "names",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "xi36mpuuup63422",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("87farary")

  return dao.saveCollection(collection)
})
