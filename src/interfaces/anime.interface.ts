export interface Anime {
    id: number;
    name: string;
    author: string | null;
    summary: string | null;
    thumbnail: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface AnimeCreatePayload {
    name: string;
    author?: string | null;
    summary?: string | null;
}

export interface AnimesRepository {
    create(payload: AnimeCreatePayload): Promise<Anime>;
    findAll(): Promise<Anime[]>;
}
