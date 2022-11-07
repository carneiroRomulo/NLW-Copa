import { Center, Text, Icon } from 'native-base'
import { Fontisto } from '@expo/vector-icons'
import { useAuth } from '../hooks/useAuth'

import Logo from '../assets/logo.svg'
import Button from '../components/Button'

const SignIn = () => {
    const { user, signIn } = useAuth()
    
    return (
        <Center flex={1} p={7} bgColor="gray.900">
            <Logo width={212} height={40} />
            <Button
                mt={12}
                title="Entrar com o google"
                leftIcon={
                    <Icon
                        as={Fontisto}
                        name="google"
                        color="white"
                        size="md" 
                    />
                }
                type="SECONDARY"
                onPress={signIn}
            />
            <Text color="white" textAlign="center" mt={4}>
                Não utilizamos nenhuma informação além {'\n'}
                do seu email para criação de sua conta.
            </Text>
        </Center>
    )
}
export default SignIn