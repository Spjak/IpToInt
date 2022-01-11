# IpToInt

Convert IP addresses to integers and back

## Features

Converts an IPv4 address to a signed Int32 and vice versa.

Use with `Ctrl+Shift+P` and search for `IpToInt`

As default, mimics the behavior of .NET `System.BitConverter`, using Little Endian endianness.
Settings allows modification of the endianness and sign in the conversion.

Automatically copies the result to clipboard.
This setting can be disabled with the `iptoint.copyToClipboard` setting.

## Release Notes

### 0.0.1

Initial release