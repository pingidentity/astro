#!/bin/bash

NUM_COMMITS=$(git rev-list $CI_MERGE_REQUEST_TARGET_BRANCH_SHA...$CI_MERGE_REQUEST_SOURCE_BRANCH_SHA | wc -l)
SINGLE_COMMIT_TITLE=$(git log --format=%B -n 1 $CI_MERGE_REQUEST_SOURCE_BRANCH_SHA)

echo "number of commits: $NUM_COMMITS"

IS_DRAFT_REGEX='^(Draft:|WIP:).*$'
IS_RELEASE_REGEX='^release-.+'

# Skip checks for draft MRs
if [[ $CI_MERGE_REQUEST_TITLE =~ $IS_DRAFT_REGEX ]]; then
  echo 'request is in draft state, skipping commitlint'
  exit 0;
elif [[ $CI_MERGE_REQUEST_SOURCE_BRANCH_NAME =~ $IS_RELEASE_REGEX ]]; then
  echo 'request is for a release branch, skipping commitlint'
  exit 0;
fi;

# When there is only one commit, Gitlab uses that commit message
# If squashing multiple commits, Gitlab uses the MR title
if [[ $NUM_COMMITS -eq 1 ]]; then
  echo 'single commit branch, linting HEAD'
  echo "linting: $SINGLE_COMMIT_TITLE"
  echo $SINGLE_COMMIT_TITLE | npx commitlint
else
  echo 'multiple commits in branch, linting MR title'
  echo "linting: $CI_MERGE_REQUEST_TITLE"
  echo $CI_MERGE_REQUEST_TITLE | npx commitlint
fi;