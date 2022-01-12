# IpToInt

Convert IPv4 addresses to integers and back

## Features

Converts an IPv4 address to a signed Int32 and vice versa.

Use with `Ctrl+Shift+P` and `IpToInt` keyword.

As default, mimics the behavior of .NET `System.BitConverter`, using Little Endian endianness.
Configuration settings can be modified to change the endianness and sign used in the conversion.

Automatically copies the result to clipboard.
This setting can be toggled with `iptoint.copyToClipboard`.

## Release Notes

### 1.0.0

Added error handling for invalid inputs
Improved Readme

### 0.0.1

Initial release