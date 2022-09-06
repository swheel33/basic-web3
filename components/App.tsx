
import { Box, Group, Text } from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { DaiTransactions } from "./DaiTransactions";
import { WelcomeMessage } from "./WelcomeMessage";

export function App() {
    const { isConnected } = useAccount()
    return (
        <Box p='20px'>
            <Group position='apart'>
                <Text size='lg' weight='bold'>Basic Web3 Site</Text>
                <ConnectButton />  
            </Group>
            {!isConnected && <WelcomeMessage />}
            {isConnected && <DaiTransactions />}
        </Box>
            
       
    )
}