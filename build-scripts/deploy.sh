#!/bin/bash
echo
echo "Publishing package script ... "
echo

cd $BUILD_DIR
if ./gradlew npmPublish; then    
    echo
else        
    echo
    echo "Publishing package script FAILED"
    echo
    exit 1
fi
