
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Testing Photo Creation...');

    // Get first category
    const category = await prisma.category.findFirst();
    if (!category) {
        console.error('No categories found! Seed them first.');
        return;
    }
    console.log('Using category:', category.name, category.id);

    try {
        const photo = await prisma.photo.create({
            data: {
                title: "Debug Photo",
                description: "Created via debug script",
                imageUrl: "/uploads/debug.jpg",
                categoryId: category.id,
                isFeatured: false,
            },
        });
        console.log('Photo created successfully:', photo.id);
    } catch (e) {
        console.error('Creation Failed:', e);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
