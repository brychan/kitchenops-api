const { Model } = require("objection");

class Company extends Model {
  static get tableName() {
    return "company";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "active"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 6, maxLength: 255 },
        active: { type: "boolean" },
      },
    };
  }

  static get modifiers() {
    return {
      basicInfo(builder) {
        builder.select("id", "company_name", "email", "active", "created_at");
      },
    };
  }
}

module.exports = Account;
