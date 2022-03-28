const { Model } = require("objection");
const bcrypt = require("bcrypt");

class Account extends Model {
  static get tableName() {
    return "account";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "password"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        password: { type: "string", minLength: 6, maxLength: 255 },
        email: { type: "string", minLength: 6, maxLength: 255 },
        admin: { type: "boolean" },
        active: { type: "boolean" },
        active_hash: { type: ["string", "null"] },
      },
    };
  }

  static get modifiers() {
    return {
      basicInfo(builder) {
        builder.select(
          "id",
          "name",
          "lastname",
          "email",
          "admin",
          "active",
          "created_at"
        );
      },
    };
  }
}

module.exports = Account;
