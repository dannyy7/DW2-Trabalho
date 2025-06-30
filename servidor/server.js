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

app.post('/Register', async (req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)
})

app.put('/Register/:id', async (req, res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        }
    })
    res.status(201).json(req.body)
})

app.delete('/Register/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(201).json({message:'usuário deletado com sucesso'})
})

app.get('/Register', async (req, res) => {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
})

app.listen(3000)