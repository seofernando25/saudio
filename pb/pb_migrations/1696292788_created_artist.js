/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "cbvs1btcdr0nnl2",
    "created": "2023-10-03 00:26:28.967Z",
    "updated": "2023-10-03 00:26:28.967Z",
    "name": "artist",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("cbvs1btcdr0nnl2");

  return dao.deleteCollection(collection);
})
