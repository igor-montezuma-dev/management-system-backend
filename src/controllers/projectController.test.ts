import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createProject, getProjects } from "./projectController";

jest.mock("@prisma/client", () => {
  const mockPrisma = {
    project: {
      create: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
});
const mockedPrisma = new PrismaClient() as jest.Mocked<PrismaClient>;

describe("Project Controller", () => {
  beforeAll(() => {
    (mockedPrisma.project.create as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Novo Projeto",
      description: "Descrição do novo projeto",
      startDate: new Date(),
      endDate: new Date(),
    });
  });

  beforeAll(() => {});

  it("should create a new project", async () => {
    const req = {
      body: {
        name: "Novo Projeto",
        description: "Descrição do novo projeto",
        startDate: new Date(),
        endDate: new Date(),
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createProject(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Novo Projeto",
      })
    );
  });

  it("should get all projects", async () => {
    const req = {} as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    
    await getProjects(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      expect.objectContaining({
        name: "Novo Projeto",
      }),
    ]);
  });
});
