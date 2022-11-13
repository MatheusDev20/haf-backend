"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemovingEmailColumn1661314884038 = void 0;
class RemovingEmailColumn1661314884038 {
    constructor() {
        this.name = 'RemovingEmailColumn1661314884038';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "pets" DROP CONSTRAINT "FK_89acb2d13c42a8bfb245183f77e"');
            yield queryRunner.query('ALTER TABLE "pets" DROP COLUMN "email"');
            yield queryRunner.query('ALTER TABLE "pets" ADD "user_email" character varying NOT NULL');
            yield queryRunner.query('ALTER TABLE "pets" DROP CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b"');
            yield queryRunner.query('ALTER TABLE "pets" DROP COLUMN "pet_owner_email"');
            yield queryRunner.query('ALTER TABLE "pets" ADD "pet_owner_email" uuid');
            yield queryRunner.query('ALTER TABLE "pets" ADD CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
            yield queryRunner.query('ALTER TABLE "pets" ADD CONSTRAINT "FK_8892809a0f4ab3095225783b28c" FOREIGN KEY ("pet_owner_email") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "pets" DROP CONSTRAINT "FK_8892809a0f4ab3095225783b28c"');
            yield queryRunner.query('ALTER TABLE "pets" DROP CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b"');
            yield queryRunner.query('ALTER TABLE "pets" DROP COLUMN "pet_owner_email"');
            yield queryRunner.query('ALTER TABLE "pets" ADD "pet_owner_email" character varying NOT NULL');
            yield queryRunner.query('ALTER TABLE "pets" ADD CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
            yield queryRunner.query('ALTER TABLE "pets" DROP COLUMN "user_email"');
            yield queryRunner.query('ALTER TABLE "pets" ADD "email" uuid');
            yield queryRunner.query('ALTER TABLE "pets" ADD CONSTRAINT "FK_89acb2d13c42a8bfb245183f77e" FOREIGN KEY ("email") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        });
    }
}
exports.RemovingEmailColumn1661314884038 = RemovingEmailColumn1661314884038;
