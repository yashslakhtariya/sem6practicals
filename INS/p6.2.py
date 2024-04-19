k_lst = []

def enc_vig(plain, k):
    enc_txt = ''
    for i in range(len(plain)):
        char = plain[i]
        k_char = k[i]
        enc_char = chr((ord(char) + ord(k_char)) % 26 + ord('A'))
        enc_txt += enc_char
    return enc_txt

print("-------VIGENERE---------------------\n")
pt = input("Enter the plain text : ")
k = input("Enter the key: ")
print(enc_vig(pt, k))
