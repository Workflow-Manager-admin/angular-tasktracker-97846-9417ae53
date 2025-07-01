#!/bin/bash
cd /home/kavia/workspace/code-generation/angular-tasktracker-97846-9417ae53/task_tracking_frontend
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

