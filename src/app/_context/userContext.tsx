"use client";

import { useConnectionMessage } from "@/composables/useConnectionMessage";
import { useHandleConnectionData } from "@/composables/useHandleConnectionData";
import { UserEntity } from "@/module/user/doamain/userEntity";
import { createContext, useState } from "react";

const defaultUser: UserEntity = {
    id: '123',
    username: 'Quan',
};

export const UserContext = createContext<UserEntity>(defaultUser);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserEntity>(defaultUser);
    const handleUser = (event: { data: string }) => {
        try {
            const result = JSON.parse(event.data);
            console.log(result);
            if (result.name === 'userinfo') {
                setUser(result.data);
            }
        } catch (error) {
            console.error('Error handling message:', error);
        }
    };
    useHandleConnectionData(handleUser);
    useConnectionMessage('userinfo', null);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}
