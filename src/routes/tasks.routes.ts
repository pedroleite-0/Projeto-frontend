import { Router } from 'express';
import { prisma } from '../lib/prisma';

// Resolve o problema do Express não saber enviar BigInt como JSON
(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

export const tasksRouter = Router();

// Buscar todas as tasks (Histórico)
tasksRouter.get('/', async (_req, res) => {
  const tasks = await prisma.task.findMany({
    orderBy: { startDate: 'desc' },
  });
  return res.json(tasks);
});

// Criar nova task
tasksRouter.post('/', async (req, res) => {
  const { id, name, duration, type, startDate } = req.body as {
    id: string;
    name: string;
    duration: number;
    type: string;
    startDate: number;
  };

  const task = await prisma.task.create({
    data: { id, name, duration, type, startDate: BigInt(startDate) },
  });

  return res.status(201).json(task);
});

// Marcar task como concluída
tasksRouter.patch('/:id/complete', async (req, res) => {
  const { id } = req.params;
  const { completedDate } = req.body as { completedDate: number };

  const task = await prisma.task.update({
    where: { id },
    data: { completedDate: BigInt(completedDate) },
  });

  return res.json(task);
});

// Marcar task como interrompida
tasksRouter.patch('/:id/interrupt', async (req, res) => {
  const { id } = req.params;
  const { interruptDate } = req.body as { interruptDate: number };

  const task = await prisma.task.update({
    where: { id },
    data: { interruptDate: BigInt(interruptDate) },
  });

  return res.json(task);
});

// Limpar histórico
tasksRouter.delete('/', async (_req, res) => {
  await prisma.task.deleteMany();
  return res.status(204).send();
});