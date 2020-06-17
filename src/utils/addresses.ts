import { utils } from "ethers"

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000"

const toChecksummedAddress = (address: string): string => utils.getAddress(address)

export { toChecksummedAddress, NULL_ADDRESS }
