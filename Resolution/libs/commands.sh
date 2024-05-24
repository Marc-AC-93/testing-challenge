#!/bin/bash

ACTION=$1

[[ $(uname -a) != *"Darwin"* ]] && sudo=sudo;

case $ACTION in
  kill) COMMAND="$sudo docker stop playwright-tests && $sudo docker rm playwright-tests" ;;
  build) COMMAND="$sudo docker compose -f docker-compose.yml up -d --build";;
  clean) COMMAND="$sudo rm -rf allure-report/* && $sudo rm -rf allure-results/* && $sudo rm -rf test-results/* && $sudo rm -rf test-results/*/ && $sudo rm -rf playwright-report/* && $sudo rm -rf dist";;
esac

eval "$COMMAND"