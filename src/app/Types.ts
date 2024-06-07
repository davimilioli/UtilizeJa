export interface Favorites {
    tool: string,
    link: string,
    label?: string
}

export interface AuthFormData {
    email: string;
    password: string
}

export interface Cep {
    cep: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
    service: string
}
  