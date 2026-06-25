import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const SettingsController = {
  // 2.2 Buscar Settings
  async get(req: Request, res: Response): Promise<void> {
    try {
      let defaultUser = await prisma.user.findFirst();
      
      // Se rodar isso antes de criar a task, cria o usuário fantasma aqui também!
      if (!defaultUser) {
        defaultUser = await prisma.user.create({
          data: { name: 'Professor', email: 'teste@teste.com', password: '123' }
        });
      }
      
      let settings = await prisma.settings.findUnique({ where: { userId: defaultUser.id } });
      
      // Se não existir, cria um padrão
      if (!settings) {
        settings = await prisma.settings.create({
          data: { workTime: 25, shortBreakTime: 5, longBreakTime: 15, userId: defaultUser.id }
        });
      }
      
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar configurações' });
    }
  },

  // 2.3 Atualizar Settings
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { workTime, shortBreakTime, longBreakTime } = req.body;
      let defaultUser = await prisma.user.findFirst();

      // Garantia extra
      if (!defaultUser) {
        defaultUser = await prisma.user.create({
          data: { name: 'Professor', email: 'teste@teste.com', password: '123' }
        });
      }

      // Usa 'upsert' que é mais seguro: atualiza se existir, cria se não existir
      const settings = await prisma.settings.upsert({
        where: { userId: defaultUser.id },
        update: { workTime, shortBreakTime, longBreakTime },
        create: { workTime, shortBreakTime, longBreakTime, userId: defaultUser.id }
      });

      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar configurações' });
    }
  }
};