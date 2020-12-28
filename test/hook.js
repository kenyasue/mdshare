const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const global = require("./global");

    before(async ()  => {
        // create dummy data

        for (let i = 0; i < 10; i++){
            const doc = await prisma.document.create({
                data: {
                    markdown: "test",
                },
            });

            if (i == 0) global.documentIdToDelete = doc.id;
            
        }

    });

    after(async () => {
        // remove all documents and finish

        await prisma.document.deleteMany();
        process.kill(0);
    });
