export interface Pokemon {
    _id: string;
    pkdx_id: string;
    national_id: string;
    name: string;
    __v: string;
    image_url: string;
    description: string;
    art_url: string;
    types: string[];
    evolutions: any[];
}