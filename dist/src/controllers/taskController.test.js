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
const taskController_1 = require("./taskController");
jest.mock('@prisma/client', () => {
    const mockPrisma = {
        task: {
            create: jest.fn(),
            findMany: jest.fn(),
        },
    };
    return { PrismaClient: jest.fn(() => mockPrisma) };
});
const { PrismaClient } = require('@prisma/client');
const mockedPrisma = new PrismaClient();
describe('Task Controller', () => {
    beforeAll(() => {
        mockedPrisma.task.create.mockResolvedValue({
            id: 1,
            title: 'Nova Tarefa',
            description: 'Descrição da nova tarefa',
            status: 'Pendente',
            priority: 'Alta',
            tags: ['tag1', 'tag2'],
            startDate: new Date(),
            dueDate: new Date(),
            points: 5,
            projectId: 1,
            authorUserId: 1,
            assignedUserId: 2,
        });
        mockedPrisma.task.findMany.mockResolvedValue([
            {
                id: 1,
                title: 'Nova Tarefa',
                description: 'Descrição da nova tarefa',
                status: 'Pendente',
                priority: 'Alta',
                tags: ['tag1', 'tag2'],
                startDate: new Date(),
                dueDate: new Date(),
                points: 5,
                projectId: 1,
                authorUserId: 1,
                assignedUserId: 2,
            },
        ]);
    });
    it('Should create a new task correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                title: 'Nova Tarefa',
                description: 'Descrição da nova tarefa',
                status: 'Pendente',
                priority: 'Alta',
                tags: ['tag1', 'tag2'],
                startDate: new Date(),
                dueDate: new Date(),
                points: 5,
                projectId: 1,
                authorUserId: 1,
                assignedUserId: 2,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        yield (0, taskController_1.createtask)(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Nova Tarefa',
        }));
    }));
    it('Should return all the tasks', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            query: {
                projectId: '1',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        yield (0, taskController_1.getTasks)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({
                title: 'Nova Tarefa',
            }),
        ]));
    }));
});
