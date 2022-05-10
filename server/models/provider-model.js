const { Model } = require("objection");

class Provider extends Model {
  static get tableName() {
    return "provider";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["company_id", "name"],

      properties: {
        id: { type: "integer" },
        comapny_id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        description: { type: ["string", "null"]},
      },
    };
  }
}

module.exports = Provider;
