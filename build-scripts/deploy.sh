#!/bin/bash
echo
echo "Publishing package script ... "
echo

# Permission to publish to Github package repository is required
npm set //npm.pkg.github.com/:_authToken $GITHUB_API_KEY

cd $TRAVIS_BUILD_DIR
if ./gradlew npmPublish; then    
    echo
else        
    echo
    echo "Publishing package script FAILED"
    echo
    exit 1
fi
