export class main_data{
    NGO_name: string;
    NGO_ID : string;
    NGO_Address ?: string;
    state : string;
    type : string;
    email : string;
    number ?: number;
}

export interface signin_data{
    username: string;
    password: string;
}

export interface NGO_signup_data{
    username: string;
    password: string;
    NGO_name: string;
    NGO_ID : string;
    NGO_Address ?: string;
    state : string;
    type : string;
    email : string;
    number ?: number;
}

export interface Donor_signup_data{
    username: string;
    password: string;
    firstname : string;
    lastname : string;
    email ?: string;
    number ?: number;
}
