/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r46y0rxha6bvjec")

  collection.indexes = []

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r46y0rxha6bvjec")

  collection.indexes = [
    "CREATE INDEX `idx_hx6l6XW` ON `downloads` (`url`)"
  ]

  return dao.saveCollection(collection)
})
