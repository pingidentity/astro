include ../../../../Makefile

HOSTING_PROJECT_BASE:=${HOSTING_PROJECT_BASE}<pkg>/

put-folder-on-server:
	set -eo;\
	ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS) mkdir ${HOSTING_PROJECT_BASE}${REMOTE_FOLDER};\
	scp -r -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} ${FOLDER}/* $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):${HOSTING_PROJECT_BASE}${REMOTE_FOLDER};\