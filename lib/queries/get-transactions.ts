export const getTransactions = async ({pageParam = 1}) => {
    try {
        const response = await fetch(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x6B175474E89094C44Da98b954EedeAC495271d0F&startblock=0&endblock=99999999&page=${pageParam}&offset=40&sort=desc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_TOKEN}`);
        const data = await response.json();
        return  {
            data: data.result,
            page: pageParam
        }
    } catch (error) {
        console.log(error)
        return null
    }
    

}