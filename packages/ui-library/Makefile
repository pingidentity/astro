NODE_VERSION=0.10.35
NPM_VERSION=2.1.8


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

NODE_FILENAME=node-v$(NODE_VERSION)-$(SYS_NAME)-$(ARCH_NAME)
NPM_FILENAME=npm-$(NPM_VERSION)

CURRENT_DIR=$(shell pwd)

SHELL := /bin/bash
PATH := $(CURRENT_DIR)/node:$(CURRENT_DIR)/node/npm/bin:$(PATH)

GIT_BRANCH=$(shell git symbolic-ref --short -q HEAD)

# load version number from file
# check that version number ends with -SNAPSHOT
GIT_TAG_FILE=version
GIT_TAG=$(shell cat $(GIT_TAG_FILE))
ifeq (,$(findstring -SNAPSHOT,$(GIT_TAG)))
$(error The version number does not contain -SNAPSHOT; cannot continue)
endif
GIT_TAG_EXISTS=$(shell if git rev-parse $(GIT_TAG) >/dev/null 2>&1; then echo "1"; else echo "0"; fi)

# remove the -SNAPSHOT part
GIT_TAG_FINAL=$(subst -SNAPSHOT,,$(GIT_TAG))
# get the version number of the next SNAPSHOT: increment the minor and append -SNAPSHOT
GIT_TAG_NEXT=$(GIT_TAG_FINAL)-SNAPSHOT


log-config:
	@echo "Building for system '$(SYS_NAME)' and architecture '$(ARCH_NAME)'"

clean-node:
	rm -rf node
	rm -rf node_modules

install-node:
	rm -f $(NODE_FILENAME).tar.gz
	wget http://art01.corp.pingidentity.com:8080/artifactory/simple/ext-releases-local/nodejs/v$(NODE_VERSION)/$(NODE_FILENAME).tar.gz
	mkdir node
	tar -xzf $(NODE_FILENAME).tar.gz --strip=2 -C node/ $(NODE_FILENAME)/bin/node
	rm -r $(NODE_FILENAME).tar.gz

install-npm:
	rm -f $(NPM_FILENAME).tgz
	wget http://art01.corp.pingidentity.com:8080/artifactory/simple/ext-releases-local/npm/$(NPM_FILENAME).tgz
	mkdir node/npm
	tar -xzf $(NPM_FILENAME).tgz --strip=1 -C node/npm
	rm -r $(NPM_FILENAME).tgz

install-node-npm: log-config clean-node install-node install-npm
	rm -rf node_mpdules
	# $(CURRENT_DIR)/node/node $(CURRENT_DIR)/node/npm/bin/npm-cli.js install

verify: install-node-npm
	npm run verify

# remove the tag from local and remote if exists
# create the tag in local and remote
tag: verify
	if [ '$(GIT_TAG_EXISTS)' = '1' ]; then echo "Tag exists; deleting..."; git tag -d $(GIT_TAG); git push --delete origin $(GIT_TAG); fi
	git tag $(GIT_TAG)
	git push origin $(GIT_TAG)

# tag the local version with the FINAL version
# save the next tag to file and commit
# create the tag in local and remote
dist:
	echo "$(GIT_TAG_NEXT)" > "$(GIT_TAG_FILE)"
	git commit -a -m "Prepare for the next release cycle"
	# git push origin $(GIT_BRANCH):$(GIT_BRANCH)
	git tag $(GIT_TAG_NEXT)
	# git push origin $(GIT_TAG_NEXT)

test:
	@echo 'test'
	@echo $(GIT_TAG)

