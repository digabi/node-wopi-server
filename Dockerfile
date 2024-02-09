FROM node:18.17.0-bullseye

WORKDIR /app
COPY . .
RUN cd /app; npm i
CMD ["npm", "start"]
