/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ioxyydjaf3q82pr")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lhsxjchs",
    "name": "artists",
    "type": "relation",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "collectionId": "cbvs1btcdr0nnl2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ioxyydjaf3q82pr")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lhsxjchs",
    "name": "artists",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "cbvs1btcdr0nnl2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
