const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const prisma = req.prisma;
  try {
    const { pessoaId, carroId } = req.body;

    const associacao = await prisma.pessoaPorCarro.create({
      data: {
        pessoaId: Number(pessoaId),
        carroId: Number(carroId),
      },
      include: {
        pessoa: true,
        carro: true,
      },
    });

    // Retorna os dados da associação
    res.status(201).json({
      pessoaId: associacao.pessoaId,
      carroId: associacao.carroId,
      pessoa: associacao.pessoa,
      carro: associacao.carro,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao associar pessoa e carro" });
  }
});

router.get("/", async (req, res) => {
  const prisma = req.prisma;
  try {
    const associacoes = await prisma.pessoaPorCarro.findMany({
      include: {
        pessoa: true,
        carro: true,
      },
    });

    // Retorna array de associações
    res.json(
      associacoes.map((a) => ({
        pessoaId: a.pessoaId,
        carroId: a.carroId,
        pessoa: a.pessoa,
        carro: a.carro,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar associações" });
  }
});

router.delete("/", async (req, res) => {
  const prisma = req.prisma;
  try {
    const { pessoaId, carroId } = req.body;

    // Deleta usando chave composta
    await prisma.pessoaPorCarro.delete({
      where: {
        pessoaId_carroId: {
          pessoaId: Number(pessoaId),
          carroId: Number(carroId),
        },
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir associação" });
  }
});

module.exports = router;