export type Player = {
    id: string;
    playerName: string;
};

export type Team = {
    id: string;
    name: string;
    members: Player[];
};

export interface RBSeedTeam {
        name?: string;
        [key: string]: any;
}