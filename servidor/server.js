// ryan
// melhorprojeto
import express from 'express';
import pkg from '@prisma/client';
import cors from 'cors';
import { OAuth2Client } from 'google-auth-library';

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

app.get('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Gasto não encontrado" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error("Erro ao buscar gasto:", error);
    res.status(500).json({ error: "Erro ao buscar gasto" });
  }
});

app.post('/spent', async (req, res) => {
  try {
    let dateObj = null;

    if (req.body.date && typeof req.body.date === "string" && req.body.date.trim() !== "") {
      dateObj = new Date(req.body.date);
      if (isNaN(dateObj.getTime())) {
        return res.status(400).json({ error: "Data inválida" });
      }
    }


    const gasto = await prisma.spent.create({
      data: {
        name: req.body.name,
        value: parseFloat(req.body.value),
        description: req.body.description,
        category: req.body.category,
        date: dateObj, // agora pode ser Date ou null
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

// Exemplo de rota no backend
app.get('/spent/search', async (req, res) => {
  const { userId, name } = req.query;

  try {
    const spents = await prisma.spent.findMany({
      where: {
        userId: userId,
        name: {
          contains: name,
          mode: 'insensitive', // busca sem diferenciar maiúsculas/minúsculas
        }
      }
    });
    res.json(spents);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar gasto por nome' });
  }
});

app.put('/spent/:id', async (req, res) => {
  try {
    let dateObj = null;

    if (req.body.date && typeof req.body.date === "string" && req.body.date.trim() !== "") {
      dateObj = new Date(req.body.date);
      if (isNaN(dateObj.getTime())) {
        return res.status(400).json({ error: "Data inválida" });
      }
    }

    const gastoAtualizado = await prisma.spent.update({
      where: {
        id: req.params.id // <- ESSA LINHA ESTAVA FALTANDO
      },
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

    res.status(200).json(gastoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar gasto:", error);
    res.status(500).json({ error: "Erro ao atualizar gasto" });
  }
});



app.delete('/spent/:id', async (req, res) => {
  try {
    await prisma.spent.delete({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ message: 'gasto deletado com sucesso' });
  } catch (error) {
    console.error("Erro ao deletar gasto:", error);
    res.status(500).json({ error: "Erro ao deletar gasto" });
  }
});

app.get('/spent', async (req, res) => {
  const { userId } = req.query;

  try {
    const spents = await prisma.spent.findMany({
      where: {
        userId: userId, // Certifique-se que userId é uma string válida
      }
    });

    res.status(200).json(spents);
  } catch (error) {
    console.error("Erro ao buscar gastos:", error);
    res.status(500).json({ error: "Erro ao buscar gastos" });
  }
});

app.get('/spent/:id', async (req, res) => {
  try {
    const gasto = await prisma.spent.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!gasto) {
      return res.status(404).json({ error: "Gasto não encontrado" });
    }

    res.status(200).json(gasto);
  } catch (error) {
    console.error("Erro ao buscar gasto:", error);
    res.status(500).json({ error: "Erro ao buscar gasto" });
  }
});


const client = new OAuth2Client('303426835993-qcn08uo4qcrrd5kgivvltuqtvr6i5ghu.apps.googleusercontent.com');

app.post('/auth/google', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '303426835993-qcn08uo4qcrrd5kgivvltuqtvr6i5ghu.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();
    const { email, name, sub } = payload;

    // Tente encontrar usuário no banco
    let user = await prisma.user.findUnique({
      where: { email }
    });

    // Se não existir, crie novo usuário com telefone e senha nulos
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          phone: '',     // pode ser atualizado depois
          password: '',  // login Google não usa senha
        }
      });
    }

    res.status(200).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    console.error('Erro ao verificar token Google:', error);
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
});


app.listen(3000)
