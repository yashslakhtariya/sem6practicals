import random #Generating Private Key
p = int(input("Enter first large prime number : "))
q = int(input("Enter second large prime number : ")) 
n = p*q
print("The value of n is : ",n)

#calculating eulers toitent function phi(n) = (p-1) * (q-1) 
phi_n = (p-1) * (q-1)
print("The value of phi(n) is : ",phi_n) 
lower = 0
upper = phi_n 
primes = [] 
e_list = []
for e in range(lower, upper):
    # all prime numbers are greater than 1 
    if e > 1:
        for i in range(2, e): 
            if (e % i) == 0:
                break 
            else:   
                primes.append(e)

#findinf if e and phi_e are co_primes (relatively prime) 
def gcd(a, b):
    while b != 0:
        a, b = b, a % b 
    return a

def coprime(a, b): 
    return gcd(a, b) == 1

for i in primes:
    if coprime(i,phi_n)==True: 
        e_list.append(i)
#print("The list of numbers all co prime with phi_n are : ",e_list) 
#selecting a value of e randomly from list of e values
e = random.choice(e_list) 
print("Selected value of e is : ",e) 

#finding value of d
for x in range(1,1000):
    y = (e*int(x))%phi_n 
    if y==1:
        d = x 
        break

print("The value of d is : ",d) 
public_key = [e,n] 
private_key = [d,n]
print("The public key is : ",public_key) 
print("The private key is : ",private_key)

message = []
print("Enter a stream of data : ") 
for i in range(0,5):
    temp = input() 
    message.append(temp) 
    i = i+1
cipher = [] 
decrypted_text = []

#Encryption
for i in message: 
    temp_i = int(i)
    temp_cipher = (temp_i**e)%n 
    cipher.append(temp_cipher)
print("The cipher text is : ",cipher) 

#Decryption
for i in cipher: 
    temp_i = int(i)
    temp_decrypt = (temp_i**d)%n 
    decrypted_text.append(temp_decrypt)
print("The Decrypted Plain text is : ",decrypted_text)