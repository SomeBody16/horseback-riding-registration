FROM node:22-alpine AS base

FROM base AS runner

WORKDIR /src

COPY --chown=node:node package.json yarn.lock .yarnrc.yml ./

RUN corepack enable

RUN chown -R node:node /src
USER node

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

EXPOSE 3000 
CMD ["yarn", "dev"] 
