const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ---------- Test User + Doctor ----------
  const hashedPassword = await bcrypt.hash("secret123", 10);

  const testUser = await prisma.user.upsert({
    where: { email: "apitest@ortomat.ua" },
    update: {},
    create: {
      email: "apitest@ortomat.ua",
      password_hash: hashedPassword,
      role: "doctor",
      first_name: "API",
      last_name: "Tester",
      phone: "+380501112233",
      is_verified: true,
    },
  });

  await prisma.doctor.upsert({
    where: { user_id: testUser.id },
    update: {},
    create: {
      user_id: testUser.id,
      qr_code: "DOCQR-API",
      referral_code: "REF-API",
      commission_rate: 10.0,
      total_sales: 0,
      total_earnings: 0.0,
    },
  });

  console.log("✅ Test doctor created: apitest@ortomat.ua / secret123");

  // ---------- Ortomats ----------
  await prisma.ortomat.createMany({
    data: [
      { name: "Ortomat 1", address: "Clinic A" },
      { name: "Ortomat 2", address: "Clinic B" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Ortomats created");

  // ---------- Products ----------
  await prisma.product.createMany({
    data: [
      {
        name: "Knee Brace",
        category: "Orthopedic",
        price: 1200,
        size: "M",
      },
      {
        name: "Wrist Support",
        category: "Orthopedic",
        price: 800,
        size: "L",
      },
      {
        name: "Ankle Brace",
        category: "Orthopedic",
        price: 950,
        size: "S",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Products created");

  console.log("🌱 Seed completed successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
