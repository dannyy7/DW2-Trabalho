// ryan
// melhorprojeto
import express from 'express'
import pkg from '@prisma/client';
import cors from 'cors'

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

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
    await prisma.spent.create({
        data: {
            name: req.body.name,
            value: req.body.value,
            description: req.body.description,
            category: req.body.category,
            date: req.body.date,
            type: req.body.type,
            userId: req.body.userId,
        }
    })
    res.status(201).json(req.body)
})

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