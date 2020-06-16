import { utils } from "ethers"

const toChecksummedAddress = (address: string): string => utils.getAddress(address)

export { toChecksummedAddress }
