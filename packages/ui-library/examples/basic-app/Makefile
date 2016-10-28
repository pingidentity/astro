NODE_VERSION=4.2.4
NPM_VERSION=3.7.1

# HOSTING_SERVER_ADDRESS=TBD_address --> TODO: Update "TBD_address" with the server's address (e.g. 35.162.25.94)
# HOSTING_SERVER_USERNAME=TBD_name --> TODO: Update "TBD_name" with the server's name (e.g. ubuntu)


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
NODE_EXEC=$(CURRENT_DIR)/node/node
NPM_EXEC=$(NODE_EXEC) $(CURRENT_DIR)/node/node_modules/npm/bin/npm-cli.js

CURRENT_DIR := $(shell pwd)

M2_HOME := $(CURRENT_DIR)/mvn
SHELL := /bin/bash
PATH := $(CURRENT_DIR)/node:$(CURRENT_DIR)/node/node_modules/npm/bin:$(PATH):$(M2_HOME)/bin


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
	mkdir -p node/node_modules/npm
	tar -xzf $(NPM_FILENAME).tgz --strip=1 -C node/node_modules/npm
	rm -r $(NPM_FILENAME).tgz
	rm -rf node_modules
	$(NPM_EXEC) install

# compile/transpile the files, so that they can be packed and distributed as a collection of static assets
package-and-upload-for-hosting: install-node-npm
	# once I have the current version packaged, upload it to hosting server and extract;
	$(NPM_EXEC) run pack;\
	rm -rf basic-app.tar.gz;\
	tar -czf basic-app.tar.gz build;\
	# TODO: Create a folder named "hosting" under the root "basic-app" folder,
	#		add a new .pem (e.g. FARM-33-341f336d.us-west-2.pem) file under it and paste the ssh key in that file
	chmod 600 ./hosting/TBD_key;\ # TODO: Update "TBD_key" here and all the ones below to be the name of the file where you pasted the ssh key
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ./hosting/TBD_key $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -f /var/www/html/basic-app.tar.gz;\
	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ./hosting/TBD_key basic-app.tar.gz $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):/var/www/html/;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ./hosting/TBD_key $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -rf /var/www/html/basic-app;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ./hosting/TBD_key $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mkdir /var/www/html/basic-app;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ./hosting/TBD_key $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) tar -xzf /var/www/html/basic-app.tar.gz --strip 1 -C /var/www/html/basic-app;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ./hosting/TBD_key $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -f /var/www/html/basic-app.tar.gz;\
	rm -f basic-app.tar.gz;\
	
