import random as r
import YSL_io as ysl
ysl.printMGNTA('\n\tOne-time Pad Method\n\t')

def enc(pt, key):
    global a
    ct = ''
    kl = len(key)
    ptl = len(pt)
    if kl < ptl:
        key += pt[:ptl-kl:]
        kl = ptl
    for i in range(ptl):
        ct += chr(((a[pt[i]] + a[key[i]]) % 26) + 97)
    ysl.printRED(f'Cipher text of given plaintext ', end='')
    print(pt, end='')
    ysl.printRED(' : ', end='')
    print(ct, end='\n\n')
    return ct, key
    
def dec(ct, key):
    global a
    dt = ''
    kl = len(key)
    ctl = len(ct)
    if kl < ctl:
        key += ct[:ctl-kl:]
        kl = ctl
    for i in range(ctl):
        dt += chr(((a[ct[i]] - a[key[i]]) % 26) + 97)
    ysl.printRED(f'Decipher text of given ciphertext ', end='')
    print(ct, end='')
    ysl.printRED(' : ', end='')
    print(dt, end='\n\n')
    
a = {chr(x+97):x for x in range(26)}
n = int(input('Enter number of messages you want to send: '))
keys = []
plaintext = []
ciphertext = []

ysl.printGRN('\nEncryption:\n')
for _ in range(n):
    pt = input('Enter plaintext: ').lower().replace(" ", "")
    plaintext.append(pt)
    key = ''
    for x in range(r.randint(6, 10)):
        key += chr(97 + r.randint(0, 25))
    ct_key = enc(pt, key)
    ciphertext.append(ct_key[0])
    keys.append(ct_key[1])

ysl.printGRN('\nDecryption:\n')
for i in range(n):
    dec(ciphertext[i], keys[i])