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
const client_1 = require("@prisma/client");
const projectController_1 = require("./projectController");
jest.mock("@prisma/client", () => {
    const mockPrisma = {
        project: {
            create: jest.fn(),
        },
    };
    return { PrismaClient: jest.fn(() => mockPrisma) };
});
const mockedPrisma = new client_1.PrismaClient();
describe("Project Controller", () => {
    beforeAll(() => {
        mockedPrisma.project.create.mockResolvedValue({
            id: 1,
            name: "Novo Projeto",
            description: "Descrição do novo projeto",
            startDate: new Date(),
            endDate: new Date(),
        });
    });
    beforeAll(() => { });
    it("should create a new project", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                name: "Novo Projeto",
                description: "Descrição do novo projeto",
                startDate: new Date(),
                endDate: new Date(),
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        yield (0, projectController_1.createProject)(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            name: "Novo Projeto",
        }));
    }));
    it("should get all projects", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        yield (0, projectController_1.getProjects)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            expect.objectContaining({
                name: "Novo Projeto",
            }),
        ]);
    }));
});
