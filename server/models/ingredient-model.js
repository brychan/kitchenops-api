const { Model } = require("objection");

class Ingredient extends Model {
  static get tableName() {
    return "ingredient";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "account_id"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        account_id: { type: "integer" },
        active: { type: "boolean" },
        deleted: { type: "boolean" },
      },
    };
  }
}

module.exports = Ingredient;
