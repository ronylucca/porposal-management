-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Costumer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "costumerId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "delivered" BOOLEAN NOT NULL,
    CONSTRAINT "Proposal_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "Costumer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Proposal_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_description_key" ON "Product"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Costumer_name_key" ON "Costumer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Proposal_costumerId_key" ON "Proposal"("costumerId");

-- CreateIndex
CREATE UNIQUE INDEX "Proposal_productId_key" ON "Proposal"("productId");
