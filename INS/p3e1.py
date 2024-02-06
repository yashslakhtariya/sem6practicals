import YSL_io


class YSL:
    @staticmethod
    def encrypt(txt, shift: int):
        ncrptd = ""
        for char in txt:
            if char.isalpha():
                if char.isupper():
                    ncrptd += chr((ord(char) + shift - 65) % 26 + 65)
                else:
                    ncrptd += chr((ord(char) + shift - 97) % 26 + 97)
            else:
                ncrptd += char
        return ncrptd

    @staticmethod
    def decrypt(txt, shift):
        return YSL.encrypt(txt, -shift)


def perform_encryption():
    input_string = YSL_io.inputRED("\n\tEnter the string to encrypt : ")
    shift_value = int(YSL_io.inputBLU("\tEnter the key value : "))
    encrypted_string = YSL.encrypt(str(input_string), shift_value)
    YSL_io.printMGNTA("\n\tEncrypted string", end=" : ")
    print(encrypted_string)


def perform_decryption():
    input_string = YSL_io.inputRED("\n\tEnter the string to decrypt : ")
    shift_value = int(YSL_io.inputBLU("\tEnter the key value : "))
    decrypted_string = YSL.decrypt(str(input_string), shift_value)
    YSL_io.printMGNTA("\n\tDecrypted string", end=" : ")
    print(decrypted_string)


if __name__ == "__main__":
    nxt = YSL_io.inputGRN(
        "\nDo you want to encrypt a string or decrypt it?\nEnter 'e' to encrypt, or 'd' to decrypt : "
    )
    while nxt.lower() not in ["e", "d"]:
        nxt = YSL_io.inputGRN(
            "\nInvalid input!\nEnter 'e' to encrypt, or 'd' to decrypt : "
        )

    if nxt.lower() == "e":
        perform_encryption()

    if nxt.lower() == "d":
        perform_decryption()
