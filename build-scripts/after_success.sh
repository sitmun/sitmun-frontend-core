#!/bin/bash
echo
echo "After successful build ..."
echo

cd $BUILD_DIR
./gradlew sonarqube
