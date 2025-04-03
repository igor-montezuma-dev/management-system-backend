import { Request, Response } from 'express';
import { createtask, getTasks } from './taskController';

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

  it('Should create a new task correctly', async () => {
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
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createtask(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Nova Tarefa',
    }));
  });

  it('Should return all the tasks', async () => {
    const req = {
      query: {
        projectId: '1',
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getTasks(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({
        title: 'Nova Tarefa',
      }),
    ]));
  });
});