FROM node:20-alpine

WORKDIR /app

# Copy package manifests
COPY backend/package*.json ./backend/
RUN cd backend && npm install --omit=dev

# Copy chaincode (needed for Fabric smart contracts)
COPY chaincode/ ./chaincode/

# Copy backend application source
COPY backend/ ./backend/

WORKDIR /app/backend

EXPOSE 5000

CMD ["npm", "start"]
