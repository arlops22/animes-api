export interface Anime {
    id: number;
    name: string;
    author: string | null;
    summary: string | null;
    thumbnail: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface AnimePayload {
    name: string;
    author?: string | null;
    summary?: string | null;
    thumbnail?: string;
}

export interface AnimeFilter {
    name?: string;
    page?: number;
    pageSize?: number;
}

export interface AnimeList {
    animes: Anime[];
    count: number;
    page: number;
    totalPages: number;
}

export interface AnimesRepository {
    create(payload: AnimePayload): Promise<Anime>;
    findAll(filter: AnimeFilter): Promise<AnimeList>;
    findById(id: number): Promise<Anime | null>;
    update(id: number, payload: AnimePayload): Promise<Anime>;
    delete(id: number): Promise<Anime>;
}
