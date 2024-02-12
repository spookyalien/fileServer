#include <stdio.h>
#include <string.h>
#include<unistd.h> 
#include <stdlib.h>

#define LINE_FEED 10

int is_command(char* cmd, const char* input)
{
    if (strcmp(cmd, input) == 0) {
        return 1;
    }
    return 0;
}

void remove_lf(char* command)
{
 
    int trailing_char = command[strlen(command)-1];
    if (trailing_char == LINE_FEED) {
        command[strlen(command) - 1] = '\0';
    }  
    
    return;
}

int DOS()
{
    char input[256];
    
    char* command;
    char* arg1;
    char* arg2;
    
    printf("Copyright (C) Microsoft Corp. 1986-1993. All rights reserved.\n");
    printf("Press Ctrl-C to exit.\n");
    while (1) {
            char cmd[256];
            printf("C:\\> ");
            
            
            if(fgets(input, sizeof input, stdin) != NULL)
            {
                command = strtok(strdup(input), " ");
                arg1    = strtok(NULL, " ");
                arg2    = strtok(NULL, " ");  
                
                if (command != NULL) {
                    // Check if command has trailing line feed
                    remove_lf(command);
                }
                else {
                    printf("Bad command or file name\n");
                }
                

                if (arg1 == NULL) {
                    if (is_command(command, "dir")) {
                        system("ls");
                    }
                    else if (is_command(command, "cls")) {
                        system("clear");
                    }
                    else {
                        system(command);
                    }
                }
                else {
                    remove_lf(arg1);
                    if (arg2 != NULL)
                        remove_lf(arg2);
                    
                    if (is_command(command, "ren") || is_command(command, "move")) {
                        snprintf(cmd, sizeof(cmd), "mv %s %s", arg1, arg2);
                        system(cmd);
                    }
                    else if (is_command(command, "del")) {
                        if (arg2 == NULL) {
                            snprintf(cmd, sizeof(cmd), "rm %s", arg1);
                        }
                        else {
                            snprintf(cmd, sizeof(cmd), "rm %s %s", arg1, arg2);
                        }
                        system(cmd);
                    }
                    else if (is_command(command, "cd")) {   
                        chdir(arg1);
                    }
                    else if (is_command(command, "copy")) {
                        snprintf(cmd, sizeof(cmd), "cp %s %s", arg1, arg2);
                        system(cmd);
                    }

                    else if (is_command(command, "type")) {
                        if (arg2 == NULL) {
                            snprintf(cmd, sizeof(cmd), "cat %s", arg1);
                        }
                        else {
                            snprintf(cmd, sizeof(cmd), "cat %s %s", arg1, arg2);
                        }
                        system(cmd);
                    }
                    else {
                        system(input);
                    }
                }
            }
    }
}

int main() 
{
    DOS();
}
