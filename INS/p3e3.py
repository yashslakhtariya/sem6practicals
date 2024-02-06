import YSL_io
import random
import os


def load_key(key_filename):
    if os.path.exists(key_filename):
        with open(key_filename, "r") as file:
            key = file.read().strip().split()
            YSL_io.printORNG("\n\tKey loaded from file:", end=" ")
            print(" ".join(key))
            return key
    return None


def generate_key(alphabet, key_filename):
    random.shuffle(alphabet)
    with open(key_filename, "w") as file:
        file.write(" ".join(alphabet))
    YSL_io.printORNG("\n\tKey generated and saved to file:", end=" ")
    print(" ".join(alphabet))
    return alphabet


def encrypt(plaintext, key):
    encrypted_text = ""
    for char in plaintext:
        if char.isalpha():
            index = ord(char.upper()) - ord("A")
            encrypted_char = key[index]
            if char.islower():
                encrypted_char = encrypted_char.lower()
            encrypted_text += encrypted_char
        else:
            encrypted_text += char
    return encrypted_text


def decrypt(ciphertext, key):
    decrypted_text = ""
    for char in ciphertext:
        if char.isalpha():
            index = key.index(char.upper())
            decrypted_char = chr(index + ord("A"))
            if char.islower():
                decrypted_char = decrypted_char.lower()
            decrypted_text += decrypted_char
        else:
            decrypted_text += char
    return decrypted_text


def save_ciphertext(ciphertext, ciphertext_filename):
    with open(ciphertext_filename, "w") as file:
        file.write(ciphertext)
    YSL_io.printRED("\n\tEncrypted text saved to file:", end=" ")
    print(ciphertext_filename)


def main():
    alphabet = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    key_filename = "monoalphabetic_key.txt"
    ciphertext_filename = "encrypted_text.txt"

    operation = YSL_io.inputGRN(
        "\n\tDo you want to encrypt or decrypt? Enter 'e' or 'd' : "
    )

    if operation.lower() == "e":
        plaintext = YSL_io.inputRED("\n\tEnter the string to encrypt : ")

        generate_key_choice = YSL_io.inputBLU(
            "\n\tDo you want to generate a key? (y/n) : "
        )
        if generate_key_choice.lower() == "y":
            key = generate_key(alphabet.copy(), key_filename)
        else:
            key = load_key(key_filename)

        if key:
            encrypted_text = encrypt(plaintext, key)
            YSL_io.printMGNTA("\n\tEncrypted string:", end=" ")
            print(encrypted_text)

            save_ciphertext(encrypted_text, ciphertext_filename)

    elif operation.lower() == "d":
        ciphertext = YSL_io.inputRED("\n\tEnter the string to decrypt : ")
        key_choice = YSL_io.inputBLU("\n\tDo you want to use an existing key? (y/n) : ")

        if key_choice.lower() == "y":
            key = load_key(key_filename)
        else:
            key = YSL_io.inputRED(
                "\n\tEnter the key (space-separated characters) : "
            ).split()

        if key:
            decrypted_text = decrypt(ciphertext, key)
            YSL_io.printMGNTA("\n\tDecrypted string:", end=" ")
            print(decrypted_text)

    else:
        YSL_io.printRED(
            "\n\tInvalid operation. Please enter 'e' for encryption or 'd' for decryption."
        )


if __name__ == "__main__":
    main()
