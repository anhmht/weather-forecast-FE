FROM node:latest as build-stage
WORKDIR /weather-forecast-FE
COPY package*.json ./
RUN yarn install
COPY ./ .
RUN yarn bundle

FROM nginx as production-stage
RUN mkdir /weather-forecast-FE
COPY --from=build-stage /weather-forecast-FE/dist /weather-forecast-FE
COPY nginx.conf /etc/nginx/nginx.conf
