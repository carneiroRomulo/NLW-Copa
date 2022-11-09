import { Button as NativeBaseButton, Text, IButtonProps } from 'native-base'

interface ButtonProps extends IButtonProps {
    title: string;
    type?: 'PRIMARY' | 'SECONDARY';
}

export function Button({ title, type = "PRIMARY" , ...rest } : ButtonProps) {
    return (
        <NativeBaseButton
            w="full"
            h={14}
            rounded="sm"
            bg={type === 'PRIMARY' ? 'yellow.500' : 'red.500'}
            _pressed={{
                bg: type === 'PRIMARY' ? 'yellow.600' : 'red.600'
            }}
            _loading={{
                _spinner: {
                    color: 'white'
                }
            }}
            {...rest}
        >
            <Text
                fontSize="sm"
                fontFamily="heading"
                textTransform="uppercase"
                color={type === 'PRIMARY' ? 'black' : 'white'}
            >
                {title}
            </Text>
        </NativeBaseButton>
    )
}