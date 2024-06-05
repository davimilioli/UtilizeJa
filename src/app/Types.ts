export interface Favorites {
    tool: string,
    link: string
}

export interface HistoricItem {
    day: string;
    progress: number;
    animated?: boolean;
}

export interface AuthFormData {
    email: string;
    senha: string
}
  