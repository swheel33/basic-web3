export type EtherscanTransaction = {
    blockHash: string
    blockNumber: string
    confirmations: string
    contractAddress: string
    cumulativeGasUsed: string
    from: string
    functionName: string
    gas: string
    gasPrice: string
    gasUsed: string
    hash: string
    input: string
    isError: string
    methodID: string
    nonce: string
    timeStamp: string
    to: string
    transactionIndex: string
    txreceipt_status: string
    value: string
}

export type TransactionFormatted = {
    to: string
    from: string
    hash: string
    timeStamp: Date
}