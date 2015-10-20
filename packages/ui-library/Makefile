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

CURRENT_DIR := $(shell pwd)

SHELL := /bin/bash
PATH := $(CURRENT_DIR)/node:$(CURRENT_DIR)/node/npm/bin:$(PATH)

MVN := java -classpath /var/lib/jenkins/tools/hudson.tasks.Maven_MavenInstallation/maven_3.2.2/boot/plexus-classworlds-2.5.1.jar -Dmaven.home=/var/lib/jenkins/tools/hudson.tasks.Maven_MavenInstallation/maven_3.2.2 -Dclassworlds.conf=/var/lib/jenkins/tools/hudson.tasks.Maven_MavenInstallation/maven_3.2.2/bin/m2.conf org.codehaus.plexus.classworlds.launcher.Launcher

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
	GIT_VERSION_MINOR_NEXT := $(shell echo $(GIT_VERSION_MINOR)+1 | bc)
	GIT_VERSION_PATCH_NEXT := $(GIT_VERSION_PATCH)
else
	GIT_VERSION_MINOR_NEXT := $(GIT_VERSION_MINOR)
	GIT_VERSION_PATCH_NEXT := $(shell echo $(GIT_VERSION_PATCH)+1 | bc)
endif
# get the version number of the next SNAPSHOT
GIT_VERSION_NEXT=$(GIT_VERSION_MAJOR).$(GIT_VERSION_MINOR_NEXT).$(GIT_VERSION_PATCH_NEXT)-SNAPSHOT


log-config:
	@echo "Building for system '$(SYS_NAME)' and architecture '$(ARCH_NAME)'"

clean-build:
	rm -rf build

clean-node:
	rm -rf node
	rm -rf node_modules

install-node:
	rm -f $(NODE_FILENAME).tar.gz
	wget http://art01.corp.pingidentity.com:8080/artifactory/simple/ext-releases-local/nodejs/v$(NODE_VERSION)/$(NODE_FILENAME).tar.gz
	mkdir -p node
	tar -xzf $(NODE_FILENAME).tar.gz --strip=2 -C node/ $(NODE_FILENAME)/bin/node
	rm -r $(NODE_FILENAME).tar.gz

install-npm:
	rm -f $(NPM_FILENAME).tgz
	wget http://art01.corp.pingidentity.com:8080/artifactory/simple/ext-releases-local/npm/$(NPM_FILENAME).tgz
	mkdir -p node/npm
	tar -xzf $(NPM_FILENAME).tgz --strip=1 -C node/npm
	rm -r $(NPM_FILENAME).tgz

install-node-npm: log-config clean-node install-node install-npm
	rm -rf node_modules
	$(NPM_EXEC) install

verify: install-node-npm
	# the freakin' npm executable is broken, makes some stupid assumptions in regard to the npm location;
	# meaning I cannot run an npm script which calls other npm scripts,
	# meaning I have to execute the npm scripts one at a time
	$(NPM_EXEC) run lint
	$(NPM_EXEC) run test

# package the module and name the file to include the current version
# deploy the package as a maven artifact
deploy: log-config clean-build
	mkdir -p build/ui-library
	cp -rf src build/ui-library
	cp -f package.json build/ui-library
	tar -czf build/ui-library-$(GIT_VERSION).tar.gz --directory=build ui-library
	$(MVN) deploy:deploy-file \
		-DgroupId=com.pingone.ui-library \
		-DartifactId=ui-library \
		-Dversion=$(GIT_VERSION) \
		-Dfile=build/ui-library-$(GIT_VERSION).tar.gz \
		-DuniqueVersion=false \
		-Dpackaging=tar.gz \
		-DrepositoryId=art01 \
		-Durl=http://art01.corp.pingidentity.com:8081/artifactory/inhouse

# set the version number to FINAL, commit and push the change
# package the module and name the file to include the FINAL version
# and deploy the package as a maven artifact
# set the version number to the next SNAPSHOT and commit
# package the module and name the file to include the current version
# deploy the package as a maven artifact
# no verification is done here, meaning node/npm are not needed
dist: log-config clean-build
	mkdir -p build
	sed -e 's/"version"[[:space:]]*:[[:space:]]*"[^"]*"/"version": "$(GIT_VERSION_FINAL)"/' package.json > package.json.tmp
	mv package.json.tmp package.json
	git commit -a -m "Release the project"
	git push origin $(GIT_BRANCH):$(GIT_BRANCH)
	mkdir build
	tar -czf build/ui-library-$(GIT_VERSION_FINAL).tar.gz --directory=build ui-library
	$(MVN) deploy:deploy-file \
		-DgroupId=com.pingone.ui-library \
		-DartifactId=ui-library \
		-Dversion=$(GIT_VERSION_FINAL) \
		-Dfile=build/ui-library-$(GIT_VERSION_FINAL).tar.gz \
		-DuniqueVersion=false \
		-Dpackaging=tar.gz \
		-DrepositoryId=art01 \
		-Durl=http://art01.corp.pingidentity.com:8081/artifactory/inhouse
	sed -e 's/"version"[[:space:]]*:[[:space:]]*"[^"]*"/"version": "$(GIT_VERSION_NEXT)"/' package.json > package.json.tmp
	mv package.json.tmp package.json
	git commit -a -m "Prepare for the next release cycle"
	git push origin $(GIT_BRANCH):$(GIT_BRANCH)
	tar -czf build/ui-library-$(GIT_VERSION_NEXT).tar.gz --directory=build ui-library
	$(MVN) deploy:deploy-file \
		-DgroupId=com.pingone.ui-library \
		-DartifactId=ui-library \
		-Dversion=$(GIT_VERSION_NEXT) \
		-Dfile=build/ui-library-$(GIT_VERSION_NEXT).tar.gz \
		-DuniqueVersion=false \
		-Dpackaging=tar.gz \
		-DrepositoryId=art01 \
		-Durl=http://art01.corp.pingidentity.com:8081/artifactory/inhouse

