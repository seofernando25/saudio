/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("cbvs1btcdr0nnl2");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "cbvs1btcdr0nnl2",
    "created": "2023-10-03 00:26:28.967Z",
    "updated": "2023-10-03 04:19:00.841Z",
    "name": "artists",
    "type": "base",
    "system": false,
    "schema": [
      {
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
})
