#/bin/bash

export NODE_ENV=test 
export DATABASE_URL=mysql://root:testtest@localhost:3307/dbtest
npx prisma migrate dev --name init --preview-feature 
mocha --timeout 600000
