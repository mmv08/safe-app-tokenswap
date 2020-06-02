import { utils } from "ethers"

const toChecksummedAddress = (address: string) => utils.getAddress(address)

export { toChecksummedAddress }
