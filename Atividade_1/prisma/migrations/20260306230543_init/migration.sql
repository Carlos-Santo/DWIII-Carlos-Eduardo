-- CreateTable
CREATE TABLE "pessoa" (
    "idpessoa" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("idpessoa")
);

-- CreateTable
CREATE TABLE "carro" (
    "idcarro" SERIAL NOT NULL,
    "modelo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,

    CONSTRAINT "carro_pkey" PRIMARY KEY ("idcarro")
);

-- CreateTable
CREATE TABLE "pessoa_por_carro" (
    "idpessoa" INTEGER NOT NULL,
    "idcarro" INTEGER NOT NULL,

    CONSTRAINT "pessoa_por_carro_pkey" PRIMARY KEY ("idpessoa","idcarro")
);

-- CreateTable
CREATE TABLE "telefone" (
    "idtelefone" SERIAL NOT NULL,
    "idpessoa" INTEGER NOT NULL,
    "numero" TEXT NOT NULL,

    CONSTRAINT "telefone_pkey" PRIMARY KEY ("idtelefone")
);

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_email_key" ON "pessoa"("email");

-- AddForeignKey
ALTER TABLE "pessoa_por_carro" ADD CONSTRAINT "pessoa_por_carro_idpessoa_fkey" FOREIGN KEY ("idpessoa") REFERENCES "pessoa"("idpessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa_por_carro" ADD CONSTRAINT "pessoa_por_carro_idcarro_fkey" FOREIGN KEY ("idcarro") REFERENCES "carro"("idcarro") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "telefone" ADD CONSTRAINT "telefone_idpessoa_fkey" FOREIGN KEY ("idpessoa") REFERENCES "pessoa"("idpessoa") ON DELETE RESTRICT ON UPDATE CASCADE;
