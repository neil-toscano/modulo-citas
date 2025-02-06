import { useState } from 'react';
import { FaChevronDown, FaSignOutAlt, FaCog, FaExchangeAlt } from 'react-icons/fa';
import {
    Avatar,
    Container,
    Group,
    Menu,
    Text,
    UnstyledButton,
} from '@mantine/core';

const user = {
    name: 'Jane Spoonfighter',
    email: 'janspoon@fighter.dev',
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
};

export function UsernameHeader({ documento }) {
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    return (
        <div className="bg-gray-50 shadow-md rounded-lg p-4 mb-2">
            <Container fluid>
                <Group justify="flex-end">
                    <Menu
                        width={260}
                        position="bottom-end"
                        transitionProps={{ transition: 'pop-top-right' }}
                        onClose={() => setUserMenuOpened(false)}
                        onOpen={() => setUserMenuOpened(true)}
                        withinPortal
                    >
                        <Menu.Target>
                            <UnstyledButton
                            >
                                <Group gap={7}>
                                    <Avatar src={null} alt="sin foto" radius="xl" size={40} color="indigo" />
                                    <Text fw={500} size="sm" lh={1} mr={3}>
                                        { documento }
                                    </Text>
                                    <FaChevronDown size={12} stroke={1.5} />
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>Configuraciones</Menu.Label>
                            <Menu.Item leftSection={<FaCog size={16} />}>
                                Cuenta
                            </Menu.Item>
                            <Menu.Item leftSection={<FaExchangeAlt size={16} />}>
                                Cambiar datos
                            </Menu.Item>
                            <Menu.Item color="red" leftSection={<FaSignOutAlt size={16} />}>Salir</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Container>
        </div>
    );
}