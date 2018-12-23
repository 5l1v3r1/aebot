FROM node

RUN npm install facebook-chat-api
ADD ./app/ /app
ADD ./aemodules/ /aemodules
ADD ./configs/ /configs
ADD ./package.json /package.json

WORKDIR /

ENV FBEMAIL="someemail@example.com"
ENV FBPASSWD="somepassword"
CMD npm start