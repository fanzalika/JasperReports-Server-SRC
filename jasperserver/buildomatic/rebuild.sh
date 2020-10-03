#/bin/bash
set -x 

./js-ant clean-config
./js-ant gen-config
./js-ant add-jdbc-driver
./js-ant build-ce
