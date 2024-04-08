export type Player = {
    id: string;
    playerName: string;
};

export type Team = {
    id: string;
    name: string;
    members: Player[];
};