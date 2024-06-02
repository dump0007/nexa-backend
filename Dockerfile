FROM node:16-alpine
# Create app directory
WORKDIR /src
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copi$
# where available (npm@5+)
COPY package*.json ./
RUN npm install --location=global ts-node
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

CMD [ "npm", "run", "start" ]# Create app directory
WORKDIR /src
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copi$
# where available (npm@5+)
COPY package*.json ./
RUN npm install --location=global ts-node
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

CMD [ "npm", "run", "start" ]