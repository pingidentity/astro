include ../../../../Makefile

put-folder-on-server:
	set -eo;\
	scp -r -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ${PRIVATE_SSH_KEY_PATH} ${FOLDER}/* $(HOSTING_SERVER_USERNAME)@$(HOSTING_SERVER_ADDRESS):${HOSTING_PROJECT_BASE}${REMOTE_FOLDER}/;\
