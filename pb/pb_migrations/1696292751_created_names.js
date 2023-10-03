/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "xi36mpuuup63422",
    "created": "2023-10-03 00:25:51.121Z",
    "updated": "2023-10-03 00:25:51.121Z",
    "name": "names",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "l5tcue4i",
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
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("xi36mpuuup63422");

  return dao.deleteCollection(collection);
})
