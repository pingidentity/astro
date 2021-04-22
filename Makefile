include ../../Makefile
LIB_NAME=astro

package-and-upload-astro:
	# PRIVATE_SSH_KEY_PATH, LIB_VERSION variables will be passed in from the command line, see Jenkinsfile.ui-library.build for example
	set -eo;\
	yarn run demo;\
	rm -rf ${LIB_NAME}.tar.gz;\
	tar -czf ${LIB_NAME}.tar.gz demo;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -f ${HOSTING_PROJECT_BASE}${LIB_NAME}.tar.gz;\
	scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} ${LIB_NAME}.tar.gz $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):${HOSTING_PROJECT_BASE};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -rf ${HOSTING_PROJECT_BASE}${LIB_NAME};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mkdir ${HOSTING_PROJECT_BASE}${LIB_NAME};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) tar -xzf ${HOSTING_PROJECT_BASE}${LIB_NAME}.tar.gz --strip 1 -C ${HOSTING_PROJECT_BASE}${LIB_NAME};\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) rm -f ${HOSTING_PROJECT_BASE}${LIB_NAME}.tar.gz;\

	rm -f ${LIB_NAME}.tar.gz;\

package-and-upload-for-hosting: package-and-upload-astro


