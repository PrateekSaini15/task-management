export const Ddl = {
    ROLE: "DdlRole"
} as const;

export type Role = typeof Ddl[keyof typeof Ddl];