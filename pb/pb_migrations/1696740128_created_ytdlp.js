/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "r46y0rxha6bvjec",
    "created": "2023-10-08 04:42:08.588Z",
    "updated": "2023-10-08 04:42:08.588Z",
    "name": "ytdlp",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "c2t538ll",
        "name": "url",
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
        "id": "aacdiwx2",
        "name": "blob",
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
  const collection = dao.findCollectionByNameOrId("r46y0rxha6bvjec");

  return dao.deleteCollection(collection);
})
