FROM timbru31/java-node
# Create app directory
RUN mkdir -p /src/app
WORKDIR /src/app

COPY package.json /src/app
RUN npm install --unsafe-perm

# VOLUME .
COPY . /src/app

ENV PORT=3000
EXPOSE 3000

CMD [ "npm", "start"]
