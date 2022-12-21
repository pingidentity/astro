include ../../Makefile

HOSTING_PROJECT_BASE:=${HOSTING_PROJECT_BASE}astro/

# Only needs to be run once, leaving as an example
initial-upload-and-version:
	set -eo;\
	yarn run demo;\
	cp -rf src demo;\

	# tar the demo

	rm -rf ${LIB_VERSION}.tar.gz;\
	tar -czf ${LIB_VERSION}.tar.gz demo;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -rf ${HOSTING_PROJECT_BASE};\

	# make the new folder and versions file

	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mkdir ${HOSTING_PROJECT_BASE};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) "echo \"[]\" >> ${HOSTING_PROJECT_BASE}versions.json";\

	# copy the tar over

	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} ${LIB_VERSION}.tar.gz $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):${HOSTING_PROJECT_BASE};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -rf ${HOSTING_PROJECT_BASE}${LIB_VERSION};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mkdir ${HOSTING_PROJECT_BASE}${LIB_VERSION};\

	# unzip

	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) tar -xzf ${HOSTING_PROJECT_BASE}${LIB_VERSION}.tar.gz --strip 1 -C ${HOSTING_PROJECT_BASE}${LIB_VERSION};\

	# remove zip

	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -f ${HOSTING_PROJECT_BASE}${LIB_VERSION}.tar.gz;\

	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):${HOSTING_PROJECT_BASE}versions.json ./;\
	yarn run append-version
	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} ./versions.json $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):${HOSTING_PROJECT_BASE}versions-$(UUID).json;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mv ${HOSTING_PROJECT_BASE}versions-$(UUID).json ${HOSTING_PROJECT_BASE}versions.json;\

	# remove local

	rm -f ./versions.json;\
	rm -f ${LIB_VERSION}.tar.gz;\

put-folder-on-server:
	set -eo;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mkdir ${HOSTING_PROJECT_BASE}${REMOTE_FOLDER};\
	scp -r -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} ${FOLDER}/* $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):${HOSTING_PROJECT_BASE}${REMOTE_FOLDER};\