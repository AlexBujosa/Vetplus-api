FROM node:20.5-alpine3.18

ENV NODE_ENV=production

ENV DATABASE_URL='mysql://utk57dfoylwc1mncpb0k:pscale_pw_1y38Hmw6ka5H4WFCDe6sDdtU0EqFLxnx1sTdoq3O2s8@aws.connect.psdb.cloud/vetplus?sslaccept=strict'

ENV GOOGLE_CLIENT_ID="442731666407-br1qi3k402j7b7c1v95scvo90ceg00u5.apps.googleusercontent.com"

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --production --silent && mv node_modules ../

COPY . .

RUN npm run build

EXPOSE 3000

RUN chown -R node /usr/src/app

USER node

CMD ["node", "dist/main.js"]
