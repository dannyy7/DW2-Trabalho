// ryan
// melhorprojeto
import express from 'express'
import pkg from '@prisma/client';
import cors from 'cors'

const { PrismaClient } = pkg;
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});


const app = express()
app.use(express.json())
app.use(cors())

app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            password: req.body.password,
        }
    })
    res.status(201).json(req.body)
})

app.put('/usuarios/:id', async (req, res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            password: req.body.password,
        }
    })
    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(201).json({ message: 'usuário deletado com sucesso' })
})

app.get('/usuarios', async (req, res) => {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
})


app.post('/spent', async (req, res) => {
  try {
    const dateObj = new Date(req.body.date);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ error: "Data inválida" });
    }

    const gasto = await prisma.spent.create({
      data: {
        name: req.body.name,
        value: parseFloat(req.body.value),
        description: req.body.description,
        category: req.body.category,
        date: dateObj,
        type: req.body.type,
        userId: req.body.userId,
      }
    });

    res.status(201).json(gasto);
  } catch (error) {
    console.error("Erro ao criar gasto:", error);
    res.status(500).json({ error: "Erro ao criar gasto" });
  }
});









app.put('/spent/:id', async (req, res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            password: req.body.password,
        }
    })
    res.status(201).json(req.body)
})

app.delete('/spent/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(201).json({ message: 'usuário deletado com sucesso' })
})

app.get('/spent', async (req, res) => {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
})

app.listen(3000)