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
NPM_EXEC=$(CURRENT_DIR)/node/node $(CURRENT_DIR)/node/npm/bin/npm-cli.js
MVN_FILENAME=apache-maven-3.2.2-bin.tar.gz

CURRENT_DIR := $(shell pwd)

M2_HOME := $(CURRENT_DIR)/mvn
SHELL := /bin/bash
PATH := $(CURRENT_DIR)/node:$(CURRENT_DIR)/node/npm/bin:$(PATH):$(M2_HOME)/bin

GIT_BRANCH := $(shell git symbolic-ref --short -q HEAD)


# extract the version number from package.json
GIT_VERSION := $(shell sed -n -e 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' package.json)

# check that version number ends with -SNAPSHOT, error out if it doesn't
ifeq (,$(findstring -SNAPSHOT,$(GIT_VERSION)))
$(error The version number does not contain -SNAPSHOT; cannot continue)
endif

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

define version_and_tag
	sed -e 's/"version"[[:space:]]*:[[:space:]]*"[^"]*"/"version": "$(1)"/' package.json > package.json.tmp
	mv package.json.tmp package.json
	git commit -a -m "$(2)"
	git push origin $(GIT_BRANCH):$(GIT_BRANCH)

endef

define package
	rm -rf build
	mkdir -p build/ui-library
	cp -rf src build/ui-library
	cp -f package.json build/ui-library
	tar -czf build/ui-library-$(1).tar.gz --directory=build ui-library
endef

define deploy
	mvn deploy:deploy-file \
		-DgroupId=com.pingone.ui-library \
		-DartifactId=ui-library \
		-Dversion=$(1) \
		-Dfile=build/ui-library-$(1).tar.gz \
		-DuniqueVersion=false \
		-Dpackaging=tar.gz \
		-DrepositoryId=art01 \
		-Durl=http://art01.corp.pingidentity.com:8081/artifactory/inhouse
endef


log-config:
	@echo "Building for system '$(SYS_NAME)' and architecture '$(ARCH_NAME)'"

clean-node:
	rm -f $(NODE_FILENAME).tar.gz
	rm -f $(NPM_FILENAME).tgz
	rm -rf node
	rm -rf node_modules

install-node-npm: clean-node
	wget http://art01.corp.pingidentity.com:8080/artifactory/simple/ext-releases-local/nodejs/v$(NODE_VERSION)/$(NODE_FILENAME).tar.gz
	mkdir -p node
	tar -xzf $(NODE_FILENAME).tar.gz --strip=2 -C node/ $(NODE_FILENAME)/bin/node
	rm -r $(NODE_FILENAME).tar.gz
	wget http://art01.corp.pingidentity.com:8080/artifactory/simple/ext-releases-local/npm/$(NPM_FILENAME).tgz
	mkdir -p node/npm
	tar -xzf $(NPM_FILENAME).tgz --strip=1 -C node/npm
	rm -r $(NPM_FILENAME).tgz
	rm -rf node_modules
	$(NPM_EXEC) install

clean-mvn:
	rm -f $(MVN_FILENAME)
	rm -rf mvn

install-mvn: clean-mvn
	wget http://archive.apache.org/dist/maven/maven-3/3.2.2/binaries/$(MVN_FILENAME)
	mkdir -p mvn
	tar -xzf apache-maven-3.2.2-bin.tar.gz --strip=1 -C mvn
	rm -f $(MVN_FILENAME)

verify: install-node-npm
	# the freakin' npm executable is broken, makes some stupid assumptions in regard to the npm location;
	# meaning I cannot run an npm script which calls other npm scripts,
	# meaning I have to execute the npm scripts one at a time
	$(NPM_EXEC) run lint
	$(NPM_EXEC) run test
	rm -rf $$TMPDIR/jest_preprocess_cache

# package the module and name the file to include the current version
# deploy the package as a maven artifact
deploy: install-mvn
	$(call package,$(GIT_VERSION))
	$(call deploy,$(GIT_VERSION))

# set the version number to FINAL, commit and push the change
# package the module and name the file to include the FINAL version
# and deploy the package as a maven artifact
# set the version number to the next SNAPSHOT and commit
# package the module and name the file to include the current version
# deploy the package as a maven artifact
# no verification is done here, meaning node/npm are not needed
dist: install-mvn
	$(call version_and_tag,$(GIT_VERSION_FINAL,"Release the project"))
	$(call package,$(GIT_VERSION_FINAL))
	$(call deploy,$(GIT_VERSION_FINAL))
	$(call version_and_tag,$(GIT_VERSION_NEXT,"Prepare for the next release cycle"))
	$(call package,$(GIT_VERSION_NEXT))
	$(call deploy,$(GIT_VERSION_NEXT))

