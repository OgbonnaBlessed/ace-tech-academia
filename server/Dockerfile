# Use the AWS Lambda Node.js 20 base image for the build stage
FROM public.ecr.aws/lambda/nodejs:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY server/package*.json ./

# Install dependencies (including dev dependencies for building)
RUN npm install

# Copy the rest of the application's source code
COPY server .

# Build TypeScript files
RUN npm run build

# Remove dev dependencies to reduce the image size
RUN npm prune --production

# Use a second stage to prepare the production image
FROM public.ecr.aws/lambda/nodejs:20

# Set the working directory to the Lambda Task Root
WORKDIR ${LAMBDA_TASK_ROOT}

# Copy the built JavaScript files and node_modules from the build stage
COPY --from=build /app/dist ${LAMBDA_TASK_ROOT}
COPY --from=build /app/node_modules ${LAMBDA_TASK_ROOT}/node_modules

# Optional: Copy package.json to the Lambda Task Root
COPY --from=build /app/package*.json ${LAMBDA_TASK_ROOT}

# Set environment variables for production
ENV NODE_ENV=production

# Command to start the Lambda function
CMD ["index.handler"]