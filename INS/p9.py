import hashlib
import YSL_io as ysl

ysl.printMGNTA("=============================== Sender side ===============================\n")
message = ysl.inputGRN("\nEnter the message : ")
ysl.printORNG("\nMessage : ", message) 

result = hashlib.sha512(message.encode()) 
hashval = result.hexdigest()
ysl.printORNG("\nHash value : ", hashval) 

finalmessage = message + 'xx' + hashval 
ysl.printORNG("\nThe final message : ", end='') 
print(finalmessage)
ysl.printGRN("\n.......................... SENDING THE MESSAGE ..........................\n")
ysl.printMGNTA("\n=============================== Receiver side =============================\n")
ysl.printGRN("\n.......................... RECEIVING THE MESSAGE ..........................\n")

rm = finalmessage 
ysl.printORNG("Received message : ", end='')
print(rm) 

rm2 = rm.split('xx') 
message = rm2[0] 
hashval = rm2[1]

result = hashlib.sha512(message.encode()) 
temp = result.hexdigest()

ysl.printORNG("\nReceived message : ", end='')
print(message) 
ysl.printORNG("\nHash value of received message : ", end='') 
print(temp)
ysl.printORNG("\nReceived hash value : ", end='')
print(hashval) 
ysl.printGRN("\n................ Checking If message is altered or not ................\n")

if temp == hashval:
    ysl.printRED("\nThe message is not altered and Integrity achieved.") 
else:
    ysl.printRED("\nThe message is altered and Integrity not achieved.")
