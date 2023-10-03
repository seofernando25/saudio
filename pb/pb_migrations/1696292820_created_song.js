/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ioxyydjaf3q82pr",
    "created": "2023-10-03 00:27:00.894Z",
    "updated": "2023-10-03 00:27:00.894Z",
    "name": "song",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "sxy5bybg",
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
      },
      {
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
  const collection = dao.findCollectionByNameOrId("ioxyydjaf3q82pr");

  return dao.deleteCollection(collection);
})
