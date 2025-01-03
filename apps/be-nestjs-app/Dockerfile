FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system be-nestjs-app && \
          adduser --system -G be-nestjs-app be-nestjs-app

COPY dist/apps/be-nestjs-app be-nestjs-app/

RUN chown -R be-nestjs-app:be-nestjs-app .

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix be-nestjs-app --omit=dev -f install
EXPOSE 3000
CMD [ "node", "be-nestjs-app" ]

# builder stage named "deps"
#FROM docker.io/node:lts-alpine as deps
#
#WORKDIR /app
#RUN addgroup --system be-nestjs-app && \
#          adduser --system -G be-nestjs-app be-nestjs-app
#COPY dist/apps/be-nestjs-app/package*.json ./
#
## install extracted deps
#RUN npm install --only=production
#
## install additional deps
#RUN npm install
#
## runner stage
#FROM docker.io/node:lts-alpine as runner
## Set working directory
#WORKDIR /app
#
## Create the same non-root user as in the builder stage
#RUN addgroup --system be-nestjs-app && \
#    adduser --system -G be-nestjs-app be-nestjs-app
## pull in packages from builder stage
#COPY --from=deps /app/node_modules ./node_modules
#COPY --from=deps /app/package.json ./package.json
#
## copy local, compiled app
#COPY dist/apps/be-nestjs-app .
#RUN chown -R be-nestjs-app:be-nestjs-app .
#USER be-nestjs-app
#EXPOSE 3000
#
#CMD ["node", "main.js"]
