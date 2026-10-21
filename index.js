const express = require("express");

const app = express();

app.use(express.json());

const imoveis = [
  {
    id: 1,
    codigo: "APT-001",
    titulo: "Apartamento 3 dormitórios",
    tipo: "apartamento",
    cidade: "Guarulhos",
    bairro: "Macedo",
    quartos: 3,
    suites: 1,
    vagas: 2,
    valor: 550000,
    imagem:
      "https://via.placeholder.com/600x400",
    link:
      "https://imobiliaria.com/imovel/APT-001"
  },
  {
    id: 2,
    codigo: "CAS-001",
    titulo: "Casa 4 dormitórios",
    tipo: "casa",
    cidade: "Guarulhos",
    bairro: "Centro",
    quartos: 4,
    suites: 2,
    vagas: 3,
    valor: 850000,
    imagem:
      "https://via.placeholder.com/600x400",
    link:
      "https://imobiliaria.com/imovel/CAS-001"
  },
  {
    id: 3,
    codigo: "CAS-002",
    titulo: "Casa 3 dormitórios",
    tipo: "casa",
    cidade: "Guarulhos",
    bairro: "Jd. Bom clima",
    quartos: 3,
    suites: 1,
    vagas: 2,
    valor: 550000,
    imagem:
      "https://via.placeholder.com/600x400",
    link:
      "https://imobiliaria.com/imovel/CAS-001"
  }
];

const visitas = [];
const leads = [];

app.get("/imoveis", (req, res) => {
  res.json(imoveis);
});

app.get("/imoveis/busca", (req, res) => {
  let resultado = [...imoveis];

  const {
    cidade,
    bairro,
    tipo,
    quartos,
    valorMax
  } = req.query;

  if (cidade) {
    resultado = resultado.filter(
      i =>
        i.cidade.toLowerCase() ===
        cidade.toLowerCase()
    );
  }

  if (bairro) {
    resultado = resultado.filter(
      i =>
        i.bairro.toLowerCase() ===
        bairro.toLowerCase()
    );
  }

  if (tipo) {
    resultado = resultado.filter(
      i =>
        i.tipo.toLowerCase() ===
        tipo.toLowerCase()
    );
  }

  if (quartos) {
    resultado = resultado.filter(
      i => i.quartos >= Number(quartos)
    );
  }

  if (valorMax) {
    resultado = resultado.filter(
      i => i.valor <= Number(valorMax)
    );
  }

  res.json(resultado);
});

app.get("/imoveis/:codigo", (req, res) => {
  const imovel = imoveis.find(
    i => i.codigo === req.params.codigo
  );

  if (!imovel) {
    return res.status(404).json({
      erro: "Imóvel não encontrado"
    });
  }

  res.json(imovel);
});

app.post("/visitas", (req, res) => {
  const visita = {
    id: Date.now(),
    ...req.body
  };

  visitas.push(visita);

  res.status(201).json({
    sucesso: true,
    protocolo: visita.id
  });
});

app.post("/leads", (req, res) => {
  const lead = {
    id: Date.now(),
    ...req.body
  };

  leads.push(lead);

  res.status(201).json({
    sucesso: true,
    protocolo: lead.id
  });
});

app.listen(3000, () => {
  console.log(
    "API Imobiliária rodando na porta 3000"
  );
});