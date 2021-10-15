#!/bin/bash

NUM_COMMITS=$(git rev-list $CI_MERGE_REQUEST_TARGET_BRANCH_SHA...$CI_MERGE_REQUEST_SOURCE_BRANCH_SHA | wc -l)
SINGLE_COMMIT_TITLE=$(git log --format=%B -n 1 $CI_MERGE_REQUEST_SOURCE_BRANCH_SHA)
# $CI_MERGE_REQUEST_TITLE is a Gitlab predefined variable

echo "number of commits: $NUM_COMMITS"

# When there is only one commit, Gitlab uses that commit message
# If squashing multiple commits, Gitlab uses the MR title
if [ $NUM_COMMITS -eq 1 ]; then
  echo 'single commit branch, linting HEAD'
  echo "linting: $SINGLE_COMMIT_TITLE"
  echo $SINGLE_COMMIT_TITLE | npx  commitlint
else
  echo 'multiple commits in branch, linting MR title'
  echo "linting: $CI_MERGE_REQUEST_TITLE"
  echo $CI_MERGE_REQUEST_TITLE | npx commitlint
fi;