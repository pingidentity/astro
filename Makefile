#This file is for shared build processes. Nothing in this file is meant to be run locally
HOSTING_SERVER_ADDRESS=uilibrary.ping-eng.com
HOSTING_SERVER_USERNAME=ubuntu
#Base for UI LIBRARY
HOSTING_PROJECT_BASE=/var/www/html/


# we don't want "make" to run package-and-upload-for-hosting so I put in a useless default
default:
	@echo "Make does nothing"

build-cdn-assets:
	@echo "build-cdn-assets does nothing for ${LIB_VERSION}"

package-and-upload-for-hosting:
	# PRIVATE_SSH_KEY_PATH, LIB_VERSION variables will be passed in from the command line, see Jenkinsfile.ui-library.build for example
	set -eo;\

	yarn run doc;\
	yarn run demo;\
	cp -rf src demo;\
	cp -rf build-doc demo;\
	rm -rf ${LIB_VERSION}.tar.gz;\
	tar -czf ${LIB_VERSION}.tar.gz demo;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -f ${HOSTING_PROJECT_BASE}${LIB_VERSION}.tar.gz;\
	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} ${LIB_VERSION}.tar.gz $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):${HOSTING_PROJECT_BASE};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -rf ${HOSTING_PROJECT_BASE}${LIB_VERSION};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mkdir ${HOSTING_PROJECT_BASE}${LIB_VERSION};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) tar -xzf ${HOSTING_PROJECT_BASE}${LIB_VERSION}.tar.gz --strip 1 -C ${HOSTING_PROJECT_BASE}${LIB_VERSION};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -f ${HOSTING_PROJECT_BASE}${LIB_VERSION}.tar.gz;\
	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):${HOSTING_PROJECT_BASE}versions.json ./;\
	yarn run append-version
	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} ./versions.json $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):${HOSTING_PROJECT_BASE}versions-$(UUID).json;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mv ${HOSTING_PROJECT_BASE}versions-$(UUID).json ${HOSTING_PROJECT_BASE}versions.json;\
	rm -f ./versions.json;\
	rm -f ${LIB_VERSION}.tar.gz;\

	# update the landing page
package-and-upload-landing:
	# PRIVATE_SSH_KEY_PATH variable will be passed in from the command line, see Jenkinsfile.ui-library.build for example
	set -eo;\
	yarn run pack-landing;\
	scp -r -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} build-landing/* $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):${HOSTING_PROJECT_BASE};\



initial-upload:
	# PRIVATE_SSH_KEY_PATH, LIB_NAME variables will be passed in from the command line, see Jenkinsfile.ui-library.build for example
	set -eo;\

	#tar the demo

	tar -czf ${LIB_NAME}.tar.gz demo;\

	# make the compass folder

	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mkdir ${HOSTING_PROJECT_BASE}${LIB_NAME};\

	# copy it over

	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} ${LIB_NAME}.tar.gz $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):${HOSTING_PROJECT_BASE};\

	# unzip

	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) tar -xzf ${HOSTING_PROJECT_BASE}${LIB_NAME}.tar.gz --strip 1 -C ${HOSTING_PROJECT_BASE}${LIB_NAME};\

	# remove zip

	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -f ${HOSTING_PROJECT_BASE}${LIB_NAME}.tar.gz;\

	# remove local

	rm -f ${LIB_NAME}.tar.gz;\

