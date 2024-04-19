import hashlib

print("===============================Sender side===============================\n")
message = "helloworld" 
print("the message is : ",message) 
print("./\.")
result = hashlib.sha512(message.encode()) 
hashval = result.hexdigest()
print("the hash value is : ",hashval) 
print("./\.")
finalmessage = message+'xx'+hashval 
print("the final message is : ",finalmessage) 
print("./\.")
print("\n..........................SENDING THE MESSAGE	\n")
print("===============================Receiver side===============================") 
print("\n..........................RECEIVING THE MESSAGE.	\n")

rm = finalmessage 
print("Received message is : ",rm) 
print("./\.")
rm2 = rm.split('xx') 
message = rm2[0] 
hashval = rm2[1]
result = hashlib.sha512(message.encode()) 
temp = result.hexdigest()
print("The received message is ",message) 
print("./\.")
print("The hash value of received message is ",temp) 
print("./\.")
print("The received hash value is ",hashval) 
print("./\.")
print("\n................Checking If message is altered or not.	\n")
if temp == hashval:
    print("The message is not altered and Integrity achieved.") 
else:
    print("The message is altered and Integrity not achieved.")
