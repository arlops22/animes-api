export interface ICharacter {
    id: number;
    name: string;
    description: string | null;
    lifeStory: string | null;
    photo: string | null;
    animeId: number;
    createdAt: Date;
    updatedAt: Date;
}

export type ICharacterPayload = Omit<ICharacter, 'id' | 'createdAt' | 'updatedAt'>;

export interface ICharactersRepository {
    create(payload: ICharacterPayload): Promise<ICharacter>;
    findAll(animeId: number): Promise<ICharacter[]>;
    findById(id: number): Promise<Partial<ICharacter> | null>;
    update(id: number, payload: ICharacterPayload): Promise<ICharacter>;
    delete(id: number): Promise<ICharacter>;
}
