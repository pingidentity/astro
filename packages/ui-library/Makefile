COVERAGE_ADDRESS=https://art01.corp.pingidentity.com/artifactory/inhouse/com/pingone/ui-library/ui-library-coverage
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

MVN_FILENAME=apache-maven-3.2.2-bin.tar.gz
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

ifeq ($(GIT_BRANCH),master)
	PACKAGE_VERSION=$(GIT_VERSION)
	PACKAGE_VERSION_FINAL=$(GIT_VERSION_FINAL)
	PACKAGE_VERSION_NEXT=$(GIT_VERSION_NEXT)
else
	PACKAGE_VERSION=$(GIT_VERSION)-$(GIT_BRANCH)
	PACKAGE_VERSION_FINAL=$(GIT_VERSION_FINAL)-$(GIT_BRANCH)
	PACKAGE_VERSION_NEXT=$(GIT_VERSION_NEXT)-$(GIT_BRANCH)
endif


# find the name of the reference coverage to download, by sending HEAD requests for various coverage packages:
# get the latest for the current branch;
# if not available, get the latest from master (with no suffix);
# if no coverage is found, fail the build
COVERAGE_VERSION=$(GIT_VERSION)-$(GIT_BRANCH)
COVERAGE_STATUS_CODE=$(shell curl -s -I $(COVERAGE_ADDRESS)/$(COVERAGE_VERSION)/ui-library-coverage-$(COVERAGE_VERSION).tar.gz | grep "HTTP/1.1" | awk {'print $$2'})
ifneq ($(COVERAGE_STATUS_CODE),200)
	COVERAGE_VERSION=$(GIT_VERSION)
	COVERAGE_STATUS_CODE=$(shell curl -s -I $(COVERAGE_ADDRESS)/$(COVERAGE_VERSION)/ui-library-coverage-$(COVERAGE_VERSION).tar.gz | grep "HTTP/1.1" | awk {'print $$2'})
endif

# GERRIT_SSH_KEY_PATH variable will be passed in from the command line, see Jenkinsfile.release for example
define version_and_tag
	sed -e 's/"version"[[:space:]]*:[[:space:]]*"[^"]*"/"version": "$(1)"/' package.json > package.json.tmp
	mv package.json.tmp package.json
	git commit -a -m $(2)
	if [[ "$(1)" = "$(GIT_VERSION_FINAL)" ]]; then \
		git tag $(GIT_VERSION_FINAL); \
		GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no -i ${GERRIT_SSH_KEY_PATH}" git push origin $(GIT_VERSION_FINAL); \
	fi
	GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no -i ${GERRIT_SSH_KEY_PATH}" git push origin $(GIT_BRANCH)
endef

define run_coverage
	npm run coverage
	rm -rf $$TMPDIR/jest_preprocess_cache
endef

define package
	npm run package-library
	rm -rf dist
	mkdir -p dist/ui-library
	mkdir -p dist/ui-library/examples
	cp -rf lib dist/ui-library
	cp -f package.json dist/ui-library
	cp -f index.js dist/ui-library
	tar -czf dist/ui-library-$(1).tar.gz --directory=dist ui-library
endef

define package_coverage
	rm -rf dist/ui-library-coverage-$(1).tar.gz
	tar -czf dist/ui-library-coverage-$(1).tar.gz coverage
endef

define package_css
	rm -rf build-css/css
	rm -rf build-css/$(1)

	mkdir -p build-css/css
	npm run compile-sass

	mkdir build-css/$(1)
	mv build-css/css build-css/$(1)

	cp -rf src/images build-css/$(1)
	rm -f build-css/$(1)/images/README

	cp -rf src/fonts build-css/$(1)
	rm -f build-css/$(1)/fonts/README
endef

define deploy
	mvn deploy:deploy-file \
		-DgroupId=com.pingone.ui-library \
		-DartifactId=ui-library \
		-Dversion=$(1) \
		-Dfile=dist/ui-library-$(1).tar.gz \
		-DuniqueVersion=false \
		-Dpackaging=tar.gz \
		-DrepositoryId=art01 \
		-Durl=https://art01.corp.pingidentity.com/artifactory/inhouse \
		-s settings.xml
endef

define deploy_coverage
	mvn deploy:deploy-file \
		-DgroupId=com.pingone.ui-library \
		-DartifactId=ui-library-coverage \
		-Dversion=$(1) \
		-Dfile=dist/ui-library-coverage-$(1).tar.gz \
		-DuniqueVersion=false \
		-Dpackaging=tar.gz \
		-DrepositoryId=art01 \
		-Durl=https://art01.corp.pingidentity.com/artifactory/inhouse \
		-s settings.xml
endef

define install_reference_coverage_report
	rm -f ui-library-coverage-*.tar.gz
	rm -rf coverage-reference
	wget $(COVERAGE_ADDRESS)/$(1)/ui-library-coverage-$(1).tar.gz
	mkdir coverage-reference
	tar -xzf ui-library-coverage-$(1).tar.gz --strip 1 -C coverage-reference
endef


log-config:
	@echo "Current branch: $(GIT_BRANCH)"
	@echo "Current version: $(GIT_VERSION)"
	@echo "Building for system '$(SYS_NAME)' and architecture '$(ARCH_NAME)'"
	@echo "Package version: $(PACKAGE_VERSION)"
	@echo "Package version final: $(PACKAGE_VERSION_FINAL)"
	@echo "Package version next: $(PACKAGE_VERSION_NEXT)"
	@echo "Coverage version: $(COVERAGE_VERSION)"
	@echo "Coverage status code: $(COVERAGE_STATUS_CODE)"

install-node-npm:
	npm cache clean --force
	npm install
	npm rebuild node-sass

clean-mvn:
	rm -f $(MVN_FILENAME)
	rm -rf mvn

install-mvn: clean-mvn
	wget http://archive.apache.org/dist/maven/maven-3/3.2.2/binaries/$(MVN_FILENAME)
	mkdir -p mvn
	tar -xzf apache-maven-3.2.2-bin.tar.gz --strip=1 -C mvn
	rm -f $(MVN_FILENAME)

verify: install-node-npm
	npm run jslint
	npm run stylelint
	$(call run_coverage)

	# convert the lcov report to cobertura format to be published by Jenkins
	python tools/lcov_cobertura.py coverage/lcov.info --base-dir . --output coverage/cobertura.xml

	if [ "$(COVERAGE_STATUS_CODE)" -lt "200" ] || [ "$(COVERAGE_STATUS_CODE)" -ge "400" ]; then\
		echo "Cannot find the coverage report to download";\
		exit 1;\
	fi

	# download the coverage report from art01 for the current version
	# verify the current coverage against the reference;
	$(call install_reference_coverage_report,$(COVERAGE_VERSION))
	node tools/verify_coverage.js

integration: install-node-npm
	rm -rf reports
	npm run pack
	node_modules/.bin/wdio wdio.conf.js

# $(SAUCELABS_BROWSER) is parameter from Jenkins variable SAUCELABS_BROWSER
integration-saucelabs: install-node-npm
	rm -rf reports
	node_modules/.bin/selenium-standalone install
	node_modules/.bin/selenium-standalone start & node_modules/.bin/http-server ./build &
	npm run pack

	# create tunnel to connect to Sauce Labs
	wget https://saucelabs.com/downloads/$(SC_FILENAME)
	mkdir -p node/sc
	tar -xvf $(SC_FILENAME) --strip=1 -C node/sc
	rm -r $(SC_FILENAME)

	# SAUCELABS_USER & SAUCELABS_KEY are stored on Jenkins
	./node/sc/bin/sc -u $(SAUCELABS_USER) -k $(SAUCELABS_KEY) -i uilibrary -f ./node/sc/tunnel_is_ready.txt &

	# wait for the Sauce Labs tunnel started
	$(eval CREATING_TUNNEL_ATTEMPT=0)
	while [[ ! -e ./node/sc/tunnel_is_ready.txt ]] && [[ $$CREATING_TUNNEL_ATTEMPT -lt $(CREATING_TUNNEL_TIMEOUT) ]]; \
	do \
		CREATING_TUNNEL_ATTEMPT=$$CREATING_TUNNEL_ATTEMPT+1; \
		sleep 1; \
	done

	# start integration on Sauce Labs
	if [ -e ./node/sc/tunnel_is_ready.txt ]; then \
		node_modules/.bin/wdio -u $(SAUCELABS_USER) -k $(SAUCELABS_KEY) wdio.conf.js --$(SAUCELABS_BROWSER);\
	else \
		echo "Cannot start Sauce Labs tunnel when running on " + $(SAUCELABS_BROWSER); \
		exit 2; \
	fi

clean-css:
	rm -rf build-css

# package the module and name the file to include the current version
package: install-mvn install-node-npm clean-css
	$(call run_coverage)

	$(call package,$(PACKAGE_VERSION))
	$(call package_coverage,$(PACKAGE_VERSION))
	$(call package_css,$(PACKAGE_VERSION))

# package the module and name the file to include the current version
# deploy the package as a maven artifact
deploy: package
	$(call deploy,$(PACKAGE_VERSION))
	$(call deploy_coverage,$(PACKAGE_VERSION))

# set the version number to FINAL, commit and push the change
# package the module and name the file to include the FINAL version
# and deploy the package as a maven artifact
# set the version number to the next SNAPSHOT and commit
# package the module and name the file to include the current version
# deploy the package as a maven artifact
# no verification is done here, meaning node/npm are not needed
dist: install-mvn install-node-npm clean-css
	$(call version_and_tag,$(GIT_VERSION_FINAL),"Release the project")
	$(call package,$(PACKAGE_VERSION_FINAL))
	$(call deploy,$(PACKAGE_VERSION_FINAL))
	$(call package_css,$(PACKAGE_VERSION_FINAL))

	@echo "UI_LIBRARY_FINAL_VERSION=$(PACKAGE_VERSION_FINAL)" > version
	@echo "UI_LIBRARY_SNAPSHOT_VERSION=$(PACKAGE_VERSION_NEXT)" >> version

	$(call version_and_tag,$(PACKAGE_VERSION_NEXT),"Prepare for the next release cycle")
	$(call package,$(PACKAGE_VERSION_NEXT))
	$(call deploy,$(PACKAGE_VERSION_NEXT))
	$(call package_css,$(PACKAGE_VERSION_NEXT))

	# generate the coverage, package and deploy it
	$(call run_coverage)
	$(call package_coverage,$(PACKAGE_VERSION_NEXT))
	$(call deploy_coverage,$(PACKAGE_VERSION_NEXT))

# compile/transpile the files, so that they can be packed and distributed as a collection of static assets
package-and-upload-for-hosting: install-node-npm
	# the freakin' npm executable is broken, makes some stupid assumptions in regard to the npm location;
	# meaning I cannot run an npm script which calls other npm scripts,
	# meaning I have to execute the npm scripts one at a time ('doc' and 'pack');
	# once I have the current version packaged, upload it to hosting server and extract;
	# after that, download versions.json, add the new version (if it doesn't already exist), upload it back up
	# (with a temp unique name first, to minimize the risk of colisions with another process doing the same thing)
        # PRIVATE_SSH_KEY_PATH variable will be passed in from the command line, see Jenkinsfile.build for example
	set -eo;\
	if [ "$(GIT_BRANCH)" == "master" ]; then\
		LIB_VERSION=`sed -n -e 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' package.json`;\
		npm run doc;\
		npm run pack;\
		cp -rf src build;\
		cp -rf build-doc build;\
		rm -rf $${LIB_VERSION}.tar.gz;\
		tar -czf $${LIB_VERSION}.tar.gz build;\
		ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -f /var/www/html/$${LIB_VERSION}.tar.gz;\
		scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $${LIB_VERSION}.tar.gz $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):/var/www/html/;\
		ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -rf /var/www/html/$${LIB_VERSION};\
		ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mkdir /var/www/html/$${LIB_VERSION};\
		ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) tar -xzf /var/www/html/$${LIB_VERSION}.tar.gz --strip 1 -C /var/www/html/$${LIB_VERSION};\
		ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -f /var/www/html/$${LIB_VERSION}.tar.gz;\
		scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):/var/www/html/versions.json ./;\
		node hosting/append_current_version.js;\
		uuid=$(uuidgen);\
		scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} ./versions.json $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):/var/www/html/versions-$(UUID).json;\
		ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mv /var/www/html/versions-$(UUID).json /var/www/html/versions.json;\
		rm -f ./versions.json;\
		rm -f $${LIB_VERSION}.tar.gz;\
	fi
