export interface Anime {
    id: number;
    name: string;
    author: string | null;
    summary: string | null;
    thumbnail: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface AnimeCreate {
    name: string;
    author: string | null;
    summary: string | null;
}

export interface AnimesRepository {
    create(payload: AnimeCreate): Promise<Anime>;
    findAll(): Promise<Anime[]>;
}
