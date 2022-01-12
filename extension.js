const vscode = require('vscode')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let ipToIntCommand = vscode.commands.registerCommand('iptoint.ipToInt', async function () {
		let conf = vscode.workspace.getConfiguration()
		let ip = await vscode.window.showInputBox({prompt: "IP address"})
		if (ip) {
			if (validateIpAddress(ip)) {
				let converted = ipToInt(ip)
				vscode.window.showInformationMessage(`${converted}`)
				if (conf.get("iptoint.copyToClipboard")) {
					vscode.env.clipboard.writeText(`${converted}`)
				}
			}
			else {
				vscode.window.showInformationMessage(`Invalid IPv4 address`)
			}
		}
	})

	context.subscriptions.push(ipToIntCommand)

	let intToIpCommand = vscode.commands.registerCommand('iptoint.intToIp', async function () {
		let conf = vscode.workspace.getConfiguration()
		let integer = await vscode.window.showInputBox({prompt: "Integer"})
		if (integer) {
			if (validateInt32(integer)) {
				let converted = intToIp(integer)
				vscode.window.showInformationMessage(`${converted}`)
				if (conf.get("iptoint.copyToClipboard")) {
					vscode.env.clipboard.writeText(`${converted}`)	
				}
			}
			else {
				vscode.window.showInformationMessage(`Invalid Int32 integer`)
			}
		}

	})

	context.subscriptions.push(intToIpCommand)
}

function deactivate() {}

function ipToInt(ip) {
    var parts = ip.split(".")
	const buf = Buffer.from([parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10), parseInt(parts[3], 10)])
	if (vscode.workspace.getConfiguration().get("iptoint.endian") == "bigendian") {
		if (vscode.workspace.getConfiguration().get("iptoint.sign") == "unsigned") {
			return buf.readUInt32BE(0)
		}
		return buf.readInt32BE(0)
	}
	if (vscode.workspace.getConfiguration().get("iptoint.sign") == "unsigned") {
		return buf.readUInt32LE(0)
	}
	return buf.readInt32LE(0)
}

function intToIp(integer) {
	const buf = Buffer.allocUnsafe(4)
	if (vscode.workspace.getConfiguration().get("iptoint.endian") == "bigendian") {
		if (vscode.workspace.getConfiguration().get("iptoint.sign") == "unsigned") {
			buf.writeUInt32BE(integer, 0)
		}
		else {
			buf.writeInt32BE(integer, 0)
		}
	}
	else {
		if (vscode.workspace.getConfiguration().get("iptoint.sign") == "unsigned") {
			buf.writeUInt32LE(integer, 0)
		}
		else {
			buf.writeInt32LE(integer, 0)
		}
	}
	return buf.join(".")
}

function validateIpAddress(ip) {
	ipRegex = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/
	return ip ? ip.match(ipRegex) : false
}

function validateInt32(int) {
	if (vscode.workspace.getConfiguration().get("iptoint.sign") == "unsigned") {
		intRegex = /\b[0-9]{1,10}\b/
		if (int) {
			if (int.match(intRegex)) {
				if (int <= 4294967295) {
					return true
				}
			}
		}
	}
	else {
		intRegex = /\b(-?)[0-9]{1,10}\b/
		if (int) {
			if (int.match(intRegex)) {
				if (int <= 2147483647 && int >= -2147483648) {
					return true
				}
			}
		}
	}
	return false
}
module.exports = {
	activate,
	deactivate
}
