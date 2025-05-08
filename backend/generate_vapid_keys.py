from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import serialization
import base64

# Gera o par de chaves (usando curva P-256)
private_key = ec.generate_private_key(ec.SECP256R1())
public_key = private_key.public_key()

# Serializa a chave privada para uso com webpush
private_bytes = private_key.private_numbers().private_value.to_bytes(32, byteorder='big')
private_key_b64 = base64.urlsafe_b64encode(private_bytes).decode('utf-8').rstrip('=')

# Serializa a chave pública para uso com webpush
public_numbers = public_key.public_numbers()
x = public_numbers.x.to_bytes(32, byteorder='big')
y = public_numbers.y.to_bytes(32, byteorder='big')
public_bytes = b'\x04' + x + y
public_key_b64 = base64.urlsafe_b64encode(public_bytes).decode('utf-8').rstrip('=')

print("PUBLIC KEY:", public_key_b64)
print("PRIVATE KEY:", private_key_b64)