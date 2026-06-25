import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const TaskController = {
  // 2.4 Criar Task
  async create(req: Request, res: Response): Promise<void> {
    try {
      let defaultUser = await prisma.user.findFirst();
      if (!defaultUser) {
        defaultUser = await prisma.user.create({
          data: { name: 'Professor', email: 'teste@teste.com', password: '123' }
        });
      }

      const { id, name, duration, type, startDate } = req.body;
      
      const task: any = await prisma.task.create({
        data: { id, name, duration, type, startDate: BigInt(startDate), userId: defaultUser.id }
      });

      res.status(201).json({ ...task, startDate: task.startDate?.toString() });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
  },

  // 2.5 Marcar Task como concluída
  async complete(req: Request, res: Response): Promise<void> {
    try {
      // CORREÇÃO: "as string" garante ao TypeScript que é um texto único
      const taskId = req.params.taskId as string;
      const { completeDate } = req.body;
      
      const task: any = await prisma.task.update({
        where: { id: taskId },
        data: { completedDate: BigInt(completeDate) }
      });

      res.json({
        ...task,
        startDate: task.startDate?.toString(),
        completedDate: task.completedDate ? task.completedDate.toString() : null,
        interruptDate: task.interruptDate ? task.interruptDate.toString() : null
      });
    } catch (error) {
      res.status(404).json({ error: 'Task não encontrada' });
    }
  },

  // 2.6 Marcar Task como interrompida
  async interrupt(req: Request, res: Response): Promise<void> {
    try {
      // CORREÇÃO: "as string" aplicado aqui também
      const taskId = req.params.taskId as string;
      const { interruptDate } = req.body;
      
      const task: any = await prisma.task.update({
        where: { id: taskId },
        data: { interruptDate: BigInt(interruptDate) }
      });

      res.json({
        ...task,
        startDate: task.startDate?.toString(),
        completedDate: task.completedDate ? task.completedDate.toString() : null,
        interruptDate: task.interruptDate ? task.interruptDate.toString() : null
      });
    } catch (error) {
      res.status(404).json({ error: 'Task não encontrada' });
    }
  },

  // 2.7 Listar Tasks
  async list(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await prisma.task.findMany({
        orderBy: { startDate: 'desc' }
      });
      const safeTasks = tasks.map((t: any) => ({
        ...t,
        startDate: t.startDate?.toString(),
        completedDate: t.completedDate ? t.completedDate.toString() : null,
        interruptDate: t.interruptDate ? t.interruptDate.toString() : null,
      }));
      res.json(safeTasks);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
  },

  // 2.8 Limpar histórico
  async clear(req: Request, res: Response): Promise<void> {
    try {
      await prisma.task.deleteMany();
      res.status(204).send(); 
    } catch (error) {
      res.status(500).json({ error: 'Erro ao limpar tarefas' });
    }
  }
};