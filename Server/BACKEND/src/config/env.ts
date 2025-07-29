const env = (DATA: string) => { 
    if (!process.env[DATA]) {
        throw new Error(`${DATA} is not defined in the environment variables`);
    }
    return process.env[DATA]; 
}

export const PORT = env("PORT");
export const DB_URI = env("DB_URI");