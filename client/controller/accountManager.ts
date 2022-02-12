import Web3 from 'web3'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

const MATIC_NETWORK = 137

class AccountManager {
  connected: boolean = false
  web3Provider: any = null
  web3: any = null
  balance: number = 0
  network: any = null
  account: any = null
  formattedBalance: string = '0.00'

  async connect() {
    if (!this.connected) {
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "4def552853ad41369ab1f27cd9dfdc01",
          },
          rpc: {
            137: 'https://polygon-rpc.com',
          },
        },
      }

      const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        providerOptions,
      })

      this.web3Provider = await web3Modal.connect()
      try {
        // Request account access
        this.account = await this.web3Provider.request({
          method: 'eth_requestAccounts',
          params: [],
        })
      } catch (error) {
        // User denied account access...
        throw new Error(`User denied account access: ${error}`)
      }
      this.web3 = new Web3(this.web3Provider)
      this.network = await this.web3.eth.net.getId()
      if (this.network == MATIC_NETWORK) {
        this.connected = true
        return this.account[0]
      }
    }
  }

  getFormattedBalance(balance: number, decimals: number): string {
    let balance_BN = this.web3.utils.toBN(balance)
    let decimals_BN = this.web3.utils.toBN(10 ** decimals)
    let before_comma = balance_BN.div(decimals_BN).toString()
    let after_comma = balance_BN.mod(decimals_BN).toString()
    after_comma = after_comma.padStart(decimals, '0')
    return before_comma + '.' + after_comma.substring(0,6)
  }

  async getBalance(): Promise<string> {
    const decimals = 18
    this.balance = await this.web3.eth.getBalance(String(this.account))
    this.formattedBalance = this.getFormattedBalance(this.balance, decimals)
    return this.formattedBalance
  }
}

export default AccountManager
