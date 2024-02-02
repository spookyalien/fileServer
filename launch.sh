#! /bin/bash
# Launch fileServer sharing platform.

browser="firefox"

dotnet run &
sleep 7
${browser} https://localhost:7203
