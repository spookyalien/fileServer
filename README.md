# fileServer
Web application that allows for easy sharing between devices on the network. Simply host and visit the site whenever you want to share files. Uses React as a front end to manage UI and .NET to manage the backend using a REST API style.

## Purpose
I do not like having to load up Google Drive every time I want to transfer a file like a photo or pdf to another device. This just results in my Google Drive being clogged up with useless files and prevents the important stuff from being found. This program solves this by allowing minor transfers to be outsourced and temporary therefore preventing the need for external sources. Furthermore, by making the transfer local you are taking advantage of less network hops allowing for faster downloads.

## How to use
Ensure .NET is installed and run by either running ```launch.sh``` (Linux with Firefox) or  ```dotnet run``` in the main directory. When visiting the hosted IP you will be directed to a page with a header that contains an upload, delete, and download button. Each button has a different HTTP request that is then processed by the server to ensure appropriate permissions when managing content.

### TODO
- Add fullscreen preview option
- Add share option
- Add edit option for docx, pdf, txt, etc.
- Improve UI/UX:
  * combine buttons into single click
  * Show preview of file as button image
  * Improve mobile experience
