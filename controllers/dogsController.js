const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 공통 에러 핸들링 함수
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred", details: error.message });
  });
};

// Get all dogs
exports.getDogs = asyncHandler(async (req, res) => {
  const dogs = await prisma.dogs.findMany();
  res.json(dogs);
});

// Add a new dog
exports.addDog = asyncHandler(async (req, res) => {
  const { name, breed, age } = req.body;
  const newDog = await prisma.dogs.create({
    data: { name, breed, age },
  });
  res.status(201).json(newDog);
});

// Delete a dog by ID
exports.deleteDog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedDog = await prisma.dogs.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedDog);
});

// Update a dog by ID
exports.updateDog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, breed, age } = req.body;
  const updatedDog = await prisma.dogs.update({
    where: { id: parseInt(id) },
    data: { name, breed, age },
  });
  res.json(updatedDog);
});

// 서버 종료 시 Prisma 연결 닫기
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
