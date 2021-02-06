#!/bin/bash
# For local builds

# These variables are declared by the CI. 
# For local builds
# they need to be declared also here.
# THIS IMPLIES THAT THIS LOCAL BUILD AND THE CI BUILD
# MIGHT DIFFER.

export BUILD_DIR=${PWD}

################################################

# Get the absolute path of this script
# so we can call it from anywhere and keep the
# other scripts with relative paths

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Using source makes all of them run in the same shell process
# so they can share functions and variables


if source $DIR/script.sh; then
    source $DIR/after_success.sh                
fi
