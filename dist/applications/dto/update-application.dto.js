"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateApplicationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_application_dto_1 = require("./create-application.dto");
class UpdateApplicationDto extends (0, mapped_types_1.PartialType)(create_application_dto_1.CreateApplicationDto) {
}
exports.UpdateApplicationDto = UpdateApplicationDto;
//# sourceMappingURL=update-application.dto.js.map