import { Anchor, Container, Stack, Table, Text, Title } from "@mantine/core";
import { useViewportSize, useWindowScroll } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getTransactions } from "../lib/queries/get-transactions";
import { EtherscanTransaction, TransactionFormatted } from "../lib/types";

const truncateBytes = (bytes: string) => {
    if (!bytes) return
    const start = bytes.slice(0,4);
    const end = bytes.slice(-4);
    return `${start}...${end}`

}

export const DaiTransactions = () => {
    const [scroll] = useWindowScroll()
    const { height } = useViewportSize()
    const [loading, setLoading] = useState(false)

    const { data: fetchData, fetchNextPage, hasNextPage } = useInfiniteQuery(['transactions'], getTransactions, {
        getNextPageParam: lastPage => (lastPage?.page ?? 0) + 1
    })

    useEffect(() => {
        const getNextPage = async () => {
            if(document.body.clientHeight - height === scroll.y) {
                setLoading(true)
                await fetchNextPage()
            }
        }
        getNextPage()
    },[scroll.y])
    
    let data: any[] = fetchData?.pages[0]?.data
    for (let i = 1; i < (fetchData?.pages?.length ?? 0); i++) {
        data = [...data, ...fetchData?.pages[i]?.data]
    }
    
    const formattedData = data?.map((value: EtherscanTransaction) => ({ 
        to: value.to,
        from: value.from,
        timeStamp: new Date(parseInt(value.timeStamp) * 1000),
        hash: value.hash 
    })).filter(value => value.to !== undefined)
    
    const rows = formattedData?.map((value: TransactionFormatted, index: number) => (
        <tr key={value.hash+index}>
            <td><Anchor target='_blank' href={`https://etherscan.io/tx/${value.hash}`}>{truncateBytes(value.hash)}</Anchor></td>
            <td>{value.timeStamp.toLocaleString()}</td>
            <td><Anchor target='_blank' href={`https://etherscan.io/address/${value.to}`}>{truncateBytes(value.to)}</Anchor></td>
            <td><Anchor target='_blank' href={`https://etherscan.io/address/${value.from}`}>{truncateBytes(value.from)}</Anchor></td>
        </tr>
    ))
    

    return (
            <Container mb='25px' size='md'>
                <Stack>
                    <Title align='center'>Dai Transactions</Title>
                    {!fetchData && <Text align='center' weight='bold' size='xl'>Loading...</Text>}
                    {fetchData && <Table>
                        <thead>
                            <tr>
                                <th>Hash</th>
                                <th>Timestamp</th>
                                <th>To</th>
                                <th>From</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>}
                    {loading && <Text align='center' weight='bold' size='xl'>Loading...</Text>}
                </Stack>
            </Container>
)
   
   
}