const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Ortomats
  await prisma.ortomat.createMany({
    data: [
      { name: "РћСЂС‚РѕРјР°С‚ #1", address: "РІСѓР». РљРёС—РІСЃСЊРєР° 1, РџРѕР»С–РєР»С–РЅС–РєР° в„–1", total_cells: 37 },
      { name: "РћСЂС‚РѕРјР°С‚ #2", address: "РІСѓР». РџРµСЂРµРјРѕРіРё 15, РўСЂР°РІРјРїСѓРЅРєС‚ в„–1", total_cells: 37 },
      { name: "РћСЂС‚РѕРјР°С‚ #3", address: "РїСЂ. РњРёСЂСѓ 23, РџРѕР»С–РєР»С–РЅС–РєР° в„–3", total_cells: 37 },
      { name: "РћСЂС‚РѕРјР°С‚ #4", address: "РІСѓР». РЎРѕР±РѕСЂРЅР° 45, Р›С–РєР°СЂРЅСЏ в„–2", total_cells: 37 },
      { name: "РћСЂС‚РѕРјР°С‚ #5", address: "РІСѓР». РќРµР·Р°Р»РµР¶РЅРѕСЃС‚С– 67, РўСЂР°РІРјРїСѓРЅРєС‚ в„–2", total_cells: 37 }
    ]
  });

  // Admin
  await prisma.user.create({
    data: {
      email: "admin@ortomat.ua",
      password_hash: "hashed_password",
      role: "admin",
      first_name: "Admin",
      last_name: "System",
      phone: "+380000000000",
      is_verified: true
    }
  });

  // Couriers
  const courier1User = await prisma.user.create({
    data: {
      email: "courier1@ortomat.ua",
      password_hash: "hashed_password",
      role: "courier",
      first_name: "Р†РІР°РЅ",
      last_name: "РљСѓСЂ'С”СЂ",
      phone: "+380111111111",
      is_verified: true
    }
  });
  await prisma.courier.create({ data: { user_id: courier1User.id, status: "active" } });

  const courier2User = await prisma.user.create({
    data: {
      email: "courier2@ortomat.ua",
      password_hash: "hashed_password",
      role: "courier",
      first_name: "РџРµС‚СЂРѕ",
      last_name: "РљСѓСЂ'С”СЂ",
      phone: "+380222222222",
      is_verified: true
    }
  });
  await prisma.courier.create({ data: { user_id: courier2User.id, status: "active" } });

  // Products
  await prisma.product.createMany({
    data: [
      { name: "РќР°РєРѕР»С–РЅРЅРёРє РµР»Р°СЃС‚РёС‡РЅРёР№", category: "РћСЂС‚РѕРїРµРґС–СЏ", size: "S,M,L,XL", price: 350 },
      { name: "Р‘Р°РЅРґР°Р¶ РЅР° РіРѕРјС–Р»РєРѕРІРѕСЃС‚РѕРї", category: "РћСЂС‚РѕРїРµРґС–СЏ", size: "S,M,L", price: 280 },
      { name: "РљРѕСЂСЃРµС‚ РїРѕРїРµСЂРµРєРѕРІРёР№", category: "РћСЂС‚РѕРїРµРґС–СЏ", size: "M,L,XL", price: 600 },
      { name: "РћСЂС‚РµР· РЅР° РїСЂРѕРјРµРЅРµРІРѕ-Р·Р°Рї'СЏСЃС‚РєРѕРІРёР№ СЃСѓРіР»РѕР±", category: "РћСЂС‚РѕРїРµРґС–СЏ", size: "СѓРЅС–РІРµСЂСЃР°Р»СЊРЅРёР№", price: 400 },
      { name: "Р‘Р°РЅРґР°Р¶ РЅР° РїР»РµС‡РѕРІРёР№ СЃСѓРіР»РѕР±", category: "РћСЂС‚РѕРїРµРґС–СЏ", size: "Р»С–РІРёР№/РїСЂР°РІРёР№", price: 500 },
      { name: "Р¤С–РєСЃР°С‚РѕСЂ РєРѕР»С–РЅРЅРѕРіРѕ СЃСѓРіР»РѕР±Р°", category: "РћСЂС‚РѕРїРµРґС–СЏ", size: "S,M,L", price: 700 },
      { name: "Р•Р»Р°СЃС‚РёС‡РЅРёР№ Р±РёРЅС‚", category: "РћСЂС‚РѕРїРµРґС–СЏ", size: "5Рј,10Рј", price: 100 }
    ]
  });

  // Doctors
  const doctor1User = await prisma.user.create({
    data: {
      email: "doc1@ortomat.ua",
      password_hash: "hashed_password",
      role: "doctor",
      first_name: "РћР»РµРі",
      last_name: "Р›С–РєР°СЂ",
      phone: "+380333333333",
      is_verified: true
    }
  });
  await prisma.doctor.create({
    data: {
      user_id: doctor1User.id,
      ortomat_id: (await prisma.ortomat.findFirst({ where: { name: "РћСЂС‚РѕРјР°С‚ #1" } })).id,
      qr_code: "QR_DOC1",
      referral_code: "REF1",
      commission_rate: 10.0
    }
  });

  const doctor2User = await prisma.user.create({
    data: {
      email: "doc2@ortomat.ua",
      password_hash: "hashed_password",
      role: "doctor",
      first_name: "РњР°СЂС–СЏ",
      last_name: "Р›С–РєР°СЂ",
      phone: "+380444444444",
      is_verified: true
    }
  });
  await prisma.doctor.create({
    data: {
      user_id: doctor2User.id,
      ortomat_id: (await prisma.ortomat.findFirst({ where: { name: "РћСЂС‚РѕРјР°С‚ #2" } })).id,
      qr_code: "QR_DOC2",
      referral_code: "REF2",
      commission_rate: 12.5
    }
  });
}

main()
  .then(() => {
    console.log("вњ… Seed completed");
  })
  .catch((e) => {
    console.error("вќЊ Seed error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
