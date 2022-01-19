# NOTE: Use this Dockerfile first for testing any changes,
# so it wouldn't affect pipelines that are using the stable image.

FROM docker.corp.pingidentity.com:5400/node:fermium

RUN apt-get update && \
    apt-get -y dist-upgrade && \
    apt-get -y install curl unattended-upgrades && \
    apt-get -y autoremove && \
    apt-get clean && \
    unattended-upgrades -d

COPY --from=docker.corp.pingidentity.com:5000/ping-base/oracle-java:8 /opt/java/ /opt/java/
ENV JAVA_HOME /opt/java
ENV PATH $JAVA_HOME/bin:$PATH

RUN yarn config set registry https://art01.corp.pingidentity.com/artifactory/api/npm/npm-virtual/

# This is really just ripped from the backstopjs Docker image.
# Eventually this should be a proper multi-stage build that pulls files
# directly from that image to keep things from getting out of sync.
# https://hub.docker.com/r/backstopjs/backstopjs/dockerfile

RUN apt-get update && \
	apt-get install -y git sudo software-properties-common

RUN wget https://dl-ssl.google.com/linux/linux_signing_key.pub && sudo apt-key add linux_signing_key.pub
RUN sudo add-apt-repository "deb http://dl.google.com/linux/chrome/deb/ stable main"

RUN	apt-get -y update && apt-get -y install google-chrome-stable

RUN apt-get -qqy update \
  && apt-get -qqy --no-install-recommends install \
    libfontconfig \
    libfreetype6 \
    xfonts-cyrillic \
    xfonts-scalable \
    fonts-liberation \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    gconf-service libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxss1 libxtst6 libappindicator1 libnss3 libasound2 libatk1.0-0 libc6 ca-certificates fonts-liberation lsb-release xdg-utils wget \
  && rm -rf /var/lib/apt/lists/* \
  && apt-get -qyy clean

RUN yarn global add lerna
