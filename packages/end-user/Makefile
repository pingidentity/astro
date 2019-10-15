HOSTING_SERVER_ADDRESS=uilibrary.ping-eng.com
HOSTING_SERVER_USERNAME=ubuntu

# below are derived properties
UNAME_S := $(shell uname -s)
ifeq ($(UNAME_S),Linux)
	SYS_NAME=linux
endif
ifeq ($(UNAME_S),Darwin)
	SYS_NAME=darwin
endif

# my x64 mac returns i386 to 'uname -p' :-O
UNAME_P := $(shell uname)
ifeq ($(filter x86_64,$(UNAME_P)),)
	ARCH_NAME=x64
else ifeq ($(filter %86,$(UNAME_P)),)
	ARCH_NAME=x32
endif

SC_FILENAME=sc-4.4.1-linux.tar.gz
CREATING_TUNNEL_TIMEOUT=60
CREATING_TUNNEL_ATTEMPT=0

CURRENT_DIR := $(shell pwd)

M2_HOME := $(CURRENT_DIR)/mvn
SHELL := /bin/bash
PATH := $(PATH):$(M2_HOME)/bin

# The Git branch is to be passed as argument on the command line
# (eg. make GIT_BRANCH=master verify)
# GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
ifndef GIT_BRANCH
$(error "GIT_BRANCH should be passed as command line argument (eg. make GIT_BRANCH=uip-58 verify)")
endif


# extract the version number from package.json
GIT_VERSION := $(shell sed -n -e 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' package.json)

define package
	npm run build
endef

define package_css
	mkdir build-css
	mkdir build-css/$(1)
	mv dist/end-user.css build-css/$(1)

endef

version:
	npm version minor --no-git-tag-version
	git commit -a -m "Prepare for the next end-user release cycle"
	GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no -i ${GERRIT_SSH_KEY_PATH}" git push origin $(GIT_BRANCH)

install-node-npm:
	npm cache clean --force
	npm install
	npm rebuild node-sass

verify: install-node-npm
	npm run jest

clean-css:
	rm -rf build-css

# package the module and name the file to include the current version
package_and_tag: install-node-npm clean-css
	npm run build

	mkdir build-css
	mkdir build-css/$(GIT_VERSION)
	mv dist/end-user.css build-css/$(GIT_VERSION)

	cp -rf src/images build-css/$(GIT_VERSION)
	rm -f build-css/$(GIT_VERSION)/images/README

	cp -rf src/fonts build-css/$(GIT_VERSION)
	rm -f build-css/$(GIT_VERSION)/fonts/README

	git tag end-user-$(GIT_VERSION)
	GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no -i ${GERRIT_SSH_KEY_PATH}" git push origin end-user-$(GIT_VERSION)
