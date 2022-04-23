"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateApplicationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_application_form_dto_1 = require("./create-application-form.dto");
class UpdateApplicationDto extends (0, mapped_types_1.PartialType)(create_application_form_dto_1.CreateApplicationFormDto) {
}
exports.UpdateApplicationDto = UpdateApplicationDto;
//# sourceMappingURL=update-application-form.dto.js.map