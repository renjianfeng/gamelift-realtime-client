export declare class JoinGroup {
    getGroup(): number;
    setGroup(value: number): void;
}

export declare class LeaveGroup {
    getGroup(): number;
    setGroup(value: number): void;
}

export declare class RequestGroupMembership {
    getGroup(): number;
    setGroup(value: number): void;
}

export declare class GroupMembershipUpdate {
    getGroup(): number;
    setGroup(value: number): void;
    getPlayersList(): Array<number>;
    setPlayersList(value: Array<number>): void;
}