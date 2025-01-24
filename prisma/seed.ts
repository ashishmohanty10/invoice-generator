import { PrismaClient, Status } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const availableStatus: Status[] = ["PAID", "OPEN", "CANCELLED", "PENDING"];

function getRandomStatus(): Status {
  const randomIndex = Math.floor(Math.random() * availableStatus.length);
  return availableStatus[randomIndex];
}

async function main() {
  await prisma.invoice.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password", 10);

  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      password: hashedPassword,
      name: "Test User",
    },
  });

  const userid = user.id;

  const sampleInvoices = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      amount: 1500.0,
      description: "Consulting services for Q1 2024",
      status: getRandomStatus(),
      userId: userid,
    },
    {
      name: "Jane Smith",
      email: "jane.smith@company.com",
      amount: 2750.5,
      description: "Web development project completion",
      status: getRandomStatus(),
      userId: userid,
    },
    {
      name: "Acme Corporation",
      email: "billing@acmecorp.com",
      amount: 5000.0,
      description: "Annual software maintenance contract",
      status: getRandomStatus(),
      userId: userid,
    },
    {
      name: "Marketing Solutions Inc",
      email: "finance@marketingsolutions.com",
      amount: 3250.75,
      description: "Digital marketing campaign management",
      status: getRandomStatus(),
      userId: userid,
    },
    {
      name: "Tech Innovations LLC",
      email: "invoices@techinnovations.com",
      amount: 4500.25,
      description: "Cloud infrastructure consulting",
      status: getRandomStatus(),
      userId: userid,
    },
    {
      name: "Global Enterprises",
      email: "accounts@globalenterprises.com",
      amount: 7500.0,
      description: "Enterprise software implementation",
      status: getRandomStatus(),
      userId: userid,
    },
    {
      name: "Creative Design Studio",
      email: "billing@creativedesign.com",
      amount: 2200.0,
      description: "Branding and logo design project",
      status: getRandomStatus(),
      userId: userid,
    },
    {
      name: "Data Analytics Co",
      email: "finance@dataanalytics.com",
      amount: 6000.5,
      description: "Machine learning model development",
      status: getRandomStatus(),
      userId: userid,
    },
    {
      name: "Startup Accelerator",
      email: "invoicing@startupaccelerator.com",
      amount: 3750.0,
      description: "Mentorship and funding support",
      status: getRandomStatus(),
      userId: userid,
    },
    {
      name: "E-commerce Solutions",
      email: "billing@ecommerce-solutions.com",
      amount: 4200.75,
      description: "Platform optimization and UX design",
      status: getRandomStatus(),
      userId: userid,
    },
    {
      name: "Network Security Pros",
      email: "accounts@networksecurity.com",
      amount: 5500.0,
      description: "Cybersecurity assessment and recommendations",
      status: getRandomStatus(),
      userId: userid,
    },
    {
      name: "Green Energy Consulting",
      email: "finance@greenenergy.com",
      amount: 3900.25,
      description: "Sustainability strategy development",
      status: getRandomStatus(),
      userId: userid,
    },
    {
      name: "Education Tech Inc",
      email: "billing@edtech.com",
      amount: 2800.5,
      description: "E-learning platform development",
      status: getRandomStatus(),
      userId: userid,
    },
    {
      name: "Healthcare Innovations",
      email: "invoices@healthcareinnovations.com",
      amount: 6500.0,
      description: "Medical software development",
      status: getRandomStatus(),
      userId: userid,
    },
    {
      name: "Financial Services Group",
      email: "accounts@finservices.com",
      amount: 4750.75,
      description: "Risk management software",
      status: getRandomStatus(),
      userId: userid,
    },
    {
      name: "AI Research Labs",
      email: "billing@airesearch.com",
      amount: 8000.0,
      description: "Advanced AI algorithm development",
      status: getRandomStatus(),
      userId: userid,
    },
    {
      name: "Logistics Optimization",
      email: "finance@logisticsoptimization.com",
      amount: 3600.25,
      description: "Supply chain management consulting",
      status: getRandomStatus(),
      userId: userid,
    },
    {
      name: "Gaming Entertainment",
      email: "invoicing@gamingentertainment.com",
      amount: 5250.5,
      description: "Game design and development services",
      status: getRandomStatus(),
      userId: userid,
    },
    {
      name: "Social Media Strategies",
      email: "billing@socialmediastrategies.com",
      amount: 2950.0,
      description: "Digital marketing and social media campaign",
      status: getRandomStatus(),
      userId: userid,
    },
    {
      name: "Renewable Energy Solutions",
      email: "accounts@renewableenergy.com",
      amount: 6750.75,
      description: "Solar panel installation project management",
      status: getRandomStatus(),
      userId: userid,
    },
  ];

  for (const invoice of sampleInvoices) {
    try {
      await prisma.invoice.create({
        data: invoice,
      });
    } catch (error) {
      console.error(`Error creating invoice: ${error}`);
    }
  }

  console.log(
    "Database seeded successfully with sample invoices and randomized statuses!"
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
