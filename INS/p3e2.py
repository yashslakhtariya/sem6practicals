import YSL_io
from p3e1 import YSL

def generate_possible_plaintext_pairs(ciphertext):
    possible_pairs = []
    for shift in range(26):
        decrypted_text = YSL.decrypt(ciphertext, shift)
        possible_pairs.append((shift, decrypted_text))
    return possible_pairs

if __name__ == "__main__":
    ciphertext = YSL_io.inputGRN("\n\tEnter the cipher text : ")

    plaintext_pairs = generate_possible_plaintext_pairs(ciphertext)

    YSL_io.printORNG("\n\tAll possible plaintext pairs for the given ciphertext : \n")
    for shift, plaintext in plaintext_pairs:
        YSL_io.printMGNTA('\tFor key - ', end='')
        YSL_io.printBLU(shift, end=' : ')
        YSL_io.printRED(plaintext)
        
