import { Heading, VStack, Icon } from "native-base";

import { Octicons } from '@expo/vector-icons'

import { Button } from "../components/Button";
import { Header } from "../components/Header";

export function Pools() {
    return (
        <VStack flex={1} bgColor="gray.900" >
            <Header title="Meus bolões" showBackButton />

            <VStack
                mt={6}
                mx={5}
                borderBottomWidth={1}
                borderBottomColor="gray.600"
                pb={4}
                mb={4}
            >
                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Você ainda não participa de nenhum bolão!
                </Heading>
                <Button
                    title="BUSCAR BOLÃO POR CÓDIGO"
                    leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
                />
            </VStack>
        </VStack>
    )
}