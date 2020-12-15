include ../../Makefile

package-and-upload-compass:
	# PRIVATE_SSH_KEY_PATH, LIB_VERSION variables will be passed in from the command line, see Jenkinsfile.ui-library.build for example
	set -eo;\

	rm -rf ${LIB_VERSION}.tar.gz;\
	tar -czf ${LIB_VERSION}.tar.gz upload;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -f ${HOSTING_PROJECT_BASE}${LIB_VERSION}.tar.gz;\
	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} ${LIB_VERSION}.tar.gz $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):${HOSTING_PROJECT_BASE};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -rf ${HOSTING_PROJECT_BASE}${LIB_VERSION};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mkdir ${HOSTING_PROJECT_BASE}${LIB_VERSION};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) tar -xzf ${HOSTING_PROJECT_BASE}${LIB_VERSION}.tar.gz --strip 1 -C ${HOSTING_PROJECT_BASE}${LIB_VERSION};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -f ${HOSTING_PROJECT_BASE}${LIB_VERSION}.tar.gz;\

	rm -f ${LIB_VERSION}.tar.gz;\


initial-upload:
	# PRIVATE_SSH_KEY_PATH, LIB_VERSION variables will be passed in from the command line, see Jenkinsfile.ui-library.build for example
	set -eo;\

	#tar the demo

	tar -czf ${LIB_VERSION}.tar.gz upload;\

	# make the compass folder

	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mkdir ${HOSTING_PROJECT_BASE}${LIB_VERSION};\

	# copy it over

	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} ${LIB_VERSION}.tar.gz $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):${HOSTING_PROJECT_BASE};\

	# unzip

	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) tar -xzf ${HOSTING_PROJECT_BASE}${LIB_VERSION}.tar.gz --strip 1 -C ${HOSTING_PROJECT_BASE}${LIB_VERSION};\

	# remove zip

	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -f ${HOSTING_PROJECT_BASE}${LIB_VERSION}.tar.gz;\

	# remove local

	rm -f ${LIB_VERSION}.tar.gz;\


