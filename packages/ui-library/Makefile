HOSTING_SERVER_ADDRESS=uilibrary.ping-eng.com
HOSTING_SERVER_USERNAME=ubuntu


<<<<<<< HEAD
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

SHELL := /bin/bash

# The Git branch is to be passed as argument on the command line
# (eg. make GIT_BRANCH=master verify)
# GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
ifndef GIT_BRANCH
$(error "GIT_BRANCH should be passed as command line argument (eg. make GIT_BRANCH=uip-58 verify)")
endif


# extract the version number from package.json
GIT_VERSION := $(shell sed -n -e 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' package.json)

# get the final version by removing the -SNAPSHOT part from the version number
GIT_VERSION_FINAL=$(subst -SNAPSHOT,,$(GIT_VERSION))
# get the major, the minor and the patch parts of the version number
GIT_VERSION_MAJOR=$(word 1,$(subst ., ,$(GIT_VERSION_FINAL)))
GIT_VERSION_MINOR=$(word 2,$(subst ., ,$(GIT_VERSION_FINAL)))
GIT_VERSION_PATCH=$(word 3,$(subst ., ,$(GIT_VERSION_FINAL)))
# increment the last non-zero component of the version number
# (fucking hell, this took me ages to figure out)
# I am using this solution http://stackoverflow.com/a/1926105
ifeq ($(GIT_VERSION_PATCH),0)
	GIT_VERSION_MINOR_NEXT := $(shell echo $$(($(GIT_VERSION_MINOR)+1)))
	GIT_VERSION_PATCH_NEXT := $(GIT_VERSION_PATCH)
else
	GIT_VERSION_MINOR_NEXT := $(GIT_VERSION_MINOR)
	GIT_VERSION_PATCH_NEXT := $(shell echo $$(($(GIT_VERSION_PATCH)+1)))
endif
# get the version number of the next SNAPSHOT
GIT_VERSION_NEXT=$(GIT_VERSION_MAJOR).$(GIT_VERSION_MINOR_NEXT).$(GIT_VERSION_PATCH_NEXT)-SNAPSHOT

PACKAGE_VERSION=$(GIT_VERSION)
PACKAGE_VERSION_FINAL=$(GIT_VERSION_FINAL)
PACKAGE_VERSION_NEXT=$(GIT_VERSION_NEXT)

# GERRIT_SSH_KEY_PATH variable will be passed in from the command line, see Jenkinsfile.release for example
define version_and_tag
	sed -e 's/"version"[[:space:]]*:[[:space:]]*"[^"]*"/"version": "$(1)"/' package.json > package.json.tmp
	mv package.json.tmp package.json
	git commit -a -m $(2)
	if [[ "$(1)" = "$(GIT_VERSION_FINAL)" ]]; then \
		git tag ui-library-$(GIT_VERSION_FINAL); \
		GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no -i ${GERRIT_SSH_KEY_PATH}" git push origin ui-library-$(GIT_VERSION_FINAL); \
	fi
	GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no -i ${GERRIT_SSH_KEY_PATH}" git push origin $(GIT_BRANCH)
endef

define run_coverage
	npm run coverage-ci
	rm -rf $$TMPDIR/jest_preprocess_cache
endef

define package
	npm run package-library
endef

define package_css
	rm -rf build-css/css
	rm -rf build-css/$(1)
=======
package-and-upload-for-hosting:
	# PRIVATE_SSH_KEY_PATH, LIB_VERSION variables will be passed in from the command line, see Jenkinsfile.ui-library.build for example
	set -eo;\
>>>>>>> makefile-jenkinsfile-release-build

	npm run doc;\
	npm run pack;\
	cp -rf src build;\
	cp -rf build-doc build;\
	rm -rf ${LIB_VERSION}.tar.gz;\
	tar -czf ${LIB_VERSION}.tar.gz build;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -f /var/www/html/${LIB_VERSION}.tar.gz;\
	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} ${LIB_VERSION}.tar.gz $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):/var/www/html/;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -rf /var/www/html/${LIB_VERSION};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mkdir /var/www/html/${LIB_VERSION};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) tar -xzf /var/www/html/${LIB_VERSION}.tar.gz --strip 1 -C /var/www/html/${LIB_VERSION};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -f /var/www/html/${LIB_VERSION}.tar.gz;\
	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):/var/www/html/versions.json ./;\
	node hosting/append_current_version.js;\
	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} ./versions.json $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):/var/www/html/versions-$(UUID).json;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mv /var/www/html/versions-$(UUID).json /var/www/html/versions.json;\
	rm -f ./versions.json;\
	rm -f ${LIB_VERSION}.tar.gz;\



build-cdn-assets:
	# CDN_VERSION variable will be passed in from the command line, see Jenkinsfile.ui-library.build for example
	npm run build-css
	mkdir cdn/${CDN_VERSION}
	mv cdn/css cdn/${CDN_VERSION}

	cp -rf src/images cdn/${CDN_VERSION}
	cp -rf src/fonts cdn/${CDN_VERSION}


# update the landing page
package-and-upload-landing:
	# PRIVATE_SSH_KEY_PATH variable will be passed in from the command line, see Jenkinsfile.ui-library.build for example
	set -eo;\
	npm run pack-landing;\
	scp -r -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} build-landing/* $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):/var/www/html/;\

