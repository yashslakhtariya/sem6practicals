from prettytable import PrettyTable
from hashlib import sha1


def generate_publickey(g, p, x):
    y = (g**x) % p
    return y


def generate_signature(g, p, q, M, k, x):
    r = ((g**k) % p) % q
    k_inv = modInverse(k, q)
    s = (int((int(M) + int(x) * int(r))) * int(k_inv)) % q
    return (r, s)


def modInverse(b, n):
    for z in range(0, n):
        if ((b * z) % n) == 1:
            return z


def signatureVerify(s, r, p, q, M, g, y):
    w = (modInverse(s, q)) % q
    u1 = (w * M) % q
    u2 = (w * r) % q
    v = (((g**u1) * (y**u2)) % p) % q
    return u1, u2, v


# p = 303287
# q = 151643
# g = 252
p = 283
q = 47
g = 60


message = input("Enter the Message:")
text = message
text = int(sha1(text.encode()).hexdigest(), 16)

r = 0
s = 0
key = int(input("Enter the Key:"))

xr = key % q
k1 = 43
k = k1 % q
y = generate_publickey(g, p, xr)
sig = generate_signature(g, p, q, text, k, xr)
r = int(sig[0])
s = int(sig[1])
u1, u2, v = signatureVerify(s, r, p, q, text, g, y)

tab = PrettyTable()
tab.field_names = ["Variable", "value"]
tab.add_rows(
    [
        ["Message(M)", message],
        ["Hex value ", text],
        ["Key", key],
        ["p", p],
        ["q", q],
        ["g", q],
        ["k", k1],
        ["Public Key(y)", y],
        ["Signature ", sig],
    ]
)

tab2 = PrettyTable()
tab2.field_names = ["Variable", "Value"]
tab2.add_rows(
    [["Signature ", sig], ["r", r], ["s", s], ["u1", u1], ["u2", u2], ["v", v]]
)
print("Sender Side : ")
print(tab)
print("Receiver Side: ")
print(tab2)
if v == r:
    print("SIGNATURE IS VALID !!:)")
else:
    print("SIGNATURE IS INVALID !!:(")
