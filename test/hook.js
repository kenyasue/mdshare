const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const global = require("./global");
const Server = require("../dist/backend/server");
const server = Server.server;

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

        await server.init();
        server.listen({port:3001});

    });

    after(async () => {
        // remove all documents and finish

        await prisma.document.deleteMany();
        process.kill(0);
    });
