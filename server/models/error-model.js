const { Model } = require("objection");

class ErrorLog extends Model {
  static get tableName() {
    return "error_logs";
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        accountId: { type: ["integer", "null"] },
        error: { type: ["string", "null"] },
        endpoint: { type: ["string", "null"] },
        stacktrace: { type: ["string", "null"] },
      },
    };
  }
}

module.exports = ErrorLog;
