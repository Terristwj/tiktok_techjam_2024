# file: /circuits/scripts/02_compile.sh

#!/bin/bash

# Variable to store the name of the circuit
CIRCUIT='less_than'

FOLDER_PATH='build'

# In case there is a circuit name as input
if [ "$1" ]; then
    CIRCUIT=$1
fi

# Create a build Folder
if [ ! -d "$FOLDER_PATH" ]; then
  mkdir ${FOLDER_PATH}
fi

# Compile the circuit
circom ./circuit/${CIRCUIT}.circom --r1cs --wasm --sym --c -o ${FOLDER_PATH}

# Generate the witness.wtns
node ${FOLDER_PATH}/${CIRCUIT}_js/generate_witness.js ${FOLDER_PATH}/${CIRCUIT}_js/${CIRCUIT}.wasm ./circuit/input.json ${FOLDER_PATH}/${CIRCUIT}_js/witness.wtns