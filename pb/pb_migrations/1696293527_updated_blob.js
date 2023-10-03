/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ec0mc8g5wadhohx")

  collection.name = "blobs"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ec0mc8g5wadhohx")

  collection.name = "blob"

  return dao.saveCollection(collection)
})
