"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_name_dto_1 = require("../name/create-name.dto");
const create_residence_dto_1 = require("../residence/create-residence.dto");
class CreateProfileDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: [create_name_dto_1.CreateNameDto] }),
    __metadata("design:type", create_name_dto_1.CreateNameDto)
], CreateProfileDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [create_residence_dto_1.CreateResidenceDto] }),
    __metadata("design:type", create_residence_dto_1.CreateResidenceDto)
], CreateProfileDto.prototype, "residence", void 0);
exports.CreateProfileDto = CreateProfileDto;
//# sourceMappingURL=create-profile.dto.js.map