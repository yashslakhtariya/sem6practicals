from termcolor import colored

def printRED(y, end='\n'):
     print(colored(y, 'red'), end=end)
     
def printBLU(y, end='\n'):
     print(colored(y, 'blue'), end=end)
     
def printGRN(y, end='\n'):
     print(colored(y, 'green'), end=end)
     
def printMGNTA(y, end='\n'):
     print(colored(y, 'magenta'), end=end)
     
def printORNG(y, end='\n'):
     print(colored(y, 'yellow'), end=end)
     
# def printYLW(y):
#      print(colored(y, 'cyan'))


def inputRED(y):
     return input(colored(y, 'red'))
     
def inputBLU(y):
     return input(colored(y, 'blue'))
     
def inputGRN(y):
     return input(colored(y, 'green'))
     
def inputMGNTA(y):
     return input(colored(y, 'magenta'))
     
def inputORNG(y):
     return input(colored(y, 'yellow'))
     
# def inputYLW(y):
#      return input(colored(y, 'cyan'))
