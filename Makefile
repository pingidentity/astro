#This file is for shared build processes. Nothing in this file is meant to be run locally
HOSTING_SERVER_ADDRESS=uilibrary.ping-eng.com
HOSTING_SERVER_USERNAME=ubuntu
#Base for UI LIBRARY
HOSTING_PROJECT_BASE=/var/www/html/
PROJECT=ui-library


# we don't want "make" to run package-and-upload-for-hosting so I put in a useless default
default:
	@echo "Make does nothing"

package-and-upload-for-hosting:
	# PRIVATE_SSH_KEY_PATH, LIB_VERSION variables will be passed in from the command line, see Jenkinsfile.ui-library.build for example
	set -eo;\

	npm run doc;\
	npm run pack;\
	cp -rf src build;\
	cp -rf build-doc build;\
	rm -rf ${LIB_VERSION}.tar.gz;\
	tar -czf ${LIB_VERSION}.tar.gz build;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -f ${HOSTING_PROJECT_BASE}${LIB_VERSION}.tar.gz;\
	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} ${LIB_VERSION}.tar.gz $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):${HOSTING_PROJECT_BASE};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -rf ${HOSTING_PROJECT_BASE}${LIB_VERSION};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mkdir ${HOSTING_PROJECT_BASE}${LIB_VERSION};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) tar -xzf ${HOSTING_PROJECT_BASE}${LIB_VERSION}.tar.gz --strip 1 -C ${HOSTING_PROJECT_BASE}${LIB_VERSION};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -f ${HOSTING_PROJECT_BASE}${LIB_VERSION}.tar.gz;\
	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):${HOSTING_PROJECT_BASE}versions.json ./;\
	npm run append-version
	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} ./versions.json $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):${HOSTING_PROJECT_BASE}versions-$(UUID).json;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mv ${HOSTING_PROJECT_BASE}versions-$(UUID).json ${HOSTING_PROJECT_BASE}versions.json;\
	rm -f ./versions.json;\
	rm -f ${LIB_VERSION}.tar.gz;\

	# update the landing page
package-and-upload-landing:
	# PRIVATE_SSH_KEY_PATH variable will be passed in from the command line, see Jenkinsfile.ui-library.build for example
	set -eo;\
	npm run pack-landing;\
	scp -r -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} build-landing/* $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):${HOSTING_PROJECT_BASE};\
