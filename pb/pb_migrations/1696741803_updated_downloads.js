/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r46y0rxha6bvjec")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "odynwvo1",
    "name": "url",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 1024,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r46y0rxha6bvjec")

  // remove
  collection.schema.removeField("odynwvo1")

  return dao.saveCollection(collection)
})
