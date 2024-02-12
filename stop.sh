#! bin/bash

main_port=44473
first_port=7203

fuser -k $(main_port)
fuser -k $(first_port)
