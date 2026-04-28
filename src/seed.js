import { PrismaClient } from "../src/generated/prisma/index.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  
  const alice = await prisma.user.create({
    data: {
      username: "alice",
      email: "alice@test.com",
      password: await bcrypt.hash("Pass123", 10),
    },
  });

  const bob = await prisma.user.create({
    data: {
      username: "bob",
      email: "bob@test.com",
      password: await bcrypt.hash("Pass123", 10),
    },
  });

  
  const project1 = await prisma.project.create({
    data: {
      name: "Website Redesign",
      description: "Redesign the company website",
      status: "ACTIVE",
      userId: alice.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: "Mobile App",
      description: "Build a mobile app",
      status: "ACTIVE",
      userId: alice.id,
    },
  });

  
  const project3 = await prisma.project.create({
    data: {
      name: "Bob's Project",
      description: "Bob's personal project",
      status: "ACTIVE",
      userId: bob.id,
    },
  });

  
  await prisma.task.create({
    data: {
      title: "Design mockups",
      description: "Create wireframes for homepage",
      priority: "HIGH",
      status: "TODO",
      projectId: project1.id,
    },
  });

  await prisma.task.create({
    data: {
      title: "Setup database",
      description: "Configure PostgreSQL",
      priority: "MEDIUM",
      status: "IN_PROGRESS",
      projectId: project1.id,
    },
  });

  await prisma.task.create({
    data: {
      title: "Build login screen",
      description: "Implement login UI",
      priority: "HIGH",
      status: "TODO",
      projectId: project2.id,
    },
  });

  
  await prisma.task.create({
    data: {
      title: "Bob's first task",
      description: "Initial task for bob",
      priority: "LOW",
      status: "TODO",
      projectId: project3.id,
    },
  });

  console.log("Database seeded successfully!");
  console.log(`Alice ID: ${alice.id} | email: alice@test.com | password: Pass123`);
  console.log(`Bob ID: ${bob.id} | email: bob@test.com | password: Pass123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });