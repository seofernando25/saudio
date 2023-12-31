/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ec0mc8g5wadhohx",
    "created": "2023-10-03 00:28:01.893Z",
    "updated": "2023-10-03 00:28:01.893Z",
    "name": "blob",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zvie0nl0",
        "name": "data",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": [],
          "protected": false
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
  const collection = dao.findCollectionByNameOrId("ec0mc8g5wadhohx");

  return dao.deleteCollection(collection);
})
