import YSL_io as ysl
k_lst = []

def enc_vig(plain, k):
    enc_txt = ''
    for i in range(len(plain)):
        char = plain[i]
        k_char = k[i]
        enc_char = chr((ord(char) + ord(k_char)) % 26 + ord('A'))
        enc_txt += enc_char
    return enc_txt

pt = ysl.inputGRN("\n\tEnter the plain text : ")
k = ysl.inputORNG("\tEnter the key: ")
ysl.printRED(f'\n\tEncrypted text: ', end='')
ysl.printBLU(enc_vig(pt, k))
