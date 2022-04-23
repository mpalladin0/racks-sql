"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const adminjs_1 = require("adminjs");
const sequelize_1 = require("@adminjs/sequelize");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Racks API')
        .setDescription('Documentation on how to interact with the Racks API')
        .setVersion('1.0.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    adminjs_1.default.registerAdapter({
        Database: sequelize_1.Database, Resource: sequelize_1.Resource
    });
    await app.listen(process.env.PORT || 3030);
}
bootstrap();
//# sourceMappingURL=main.js.map