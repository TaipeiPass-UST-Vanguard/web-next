"use client";

import { useConnectionMessage } from "@/composables/useConnectionMessage";
import { useHandleConnectionData } from "@/composables/useHandleConnectionData";
import { useState } from "react";

export default function UserPage() {
    const [user, setUser] = useState<any>(null);
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

    if(!user) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <p>ID: {user.id}</p>
                <p>Account: {user.account}</p>
                <p>UserName: {user.username}</p>
                <p>RealName: {user.realName}</p>
                <p>PhoneNo: {user.phoneNo}</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
                {/* class Account {

                @JsonKey(name: 'id')
                final String id;

                @JsonKey(name: 'account')
                final String account;

                @JsonKey(name: 'username')
                final String username;

                @JsonKey(name: 'realName')
                final String realName;

                @JsonKey(name: 'idNo')
                final String idNumber;

                @JsonKey(name: 'email')
                final String email;

                @JsonKey(name: 'phoneNo')
                final String phoneNumber;

                @JsonKey(name: 'birthday')
                final String birthday;

                @JsonKey(name: 'memberType')
                final String memberType;

                @JsonKey(name: 'verifyLevel')
                final String verifyLevel;

                @JsonKey(name: 'addresses')
                final List<Address> addressList;

                    @JsonKey(name: 'residentAddress')
                    final String residentAddress;

                    @JsonKey(name: 'citizen')
                    final bool citizen;

                    @JsonKey(name: 'nativePeople')
                    final bool nativePeople;

                    @JsonKey(name: 'cityInternetUid')
                    final String cityInternetUid; */
                }
            </div>
        </div>
    );
}