/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cbvs1btcdr0nnl2")

  collection.name = "artists"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cbvs1btcdr0nnl2")

  collection.name = "artist"

  return dao.saveCollection(collection)
})
