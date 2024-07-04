# file: /circuits/scripts/prerequisite.sh

#!/bin/bash

if ! command -v circom &> /dev/null
then
    echo "Circom could not be found. Visit https://docs.circom.io/getting-started/installation/ and install circom2"
    exit 1
else
    echo "Yay, You already have Circom installed!"
    exit 1
fi