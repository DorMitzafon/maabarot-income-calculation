export const PRIVATE_PAY_KINDERGARTEN = 35;
export const PRIVATE_PAY_INFORMAL = 20;
export const PRIVATE_PAY_FORMAL = 100;

export const COMMUNITY_TAXES = 750;
export const RESIDENCE_TAX = 300;

export const MUTUAL_ASSIST_TAX_PERCENT = 1 / 100;

export const NET_INCOME_THRESHOLD = 3750;

export const ARNONA_PRICE_RATE_YEARLY = 38.06;
export const ARNONA_PRICE_RATE_MONTHLY = ARNONA_PRICE_RATE_YEARLY / 12;
export const ELECTRICITY_PRICE_RATE = 0.56;

export const WATER_USAGE_TRESHOLD = 6;
export enum WaterPriceRates {
   Low = 3.787,
   High = 9.863,
   Violation = 3.34,
} 


export const HOUSE_PROJECTION_THRESHOLD = 95;
export enum HouseProjectionPricePerMeter {
    High = 5,
    Low = 2.5
}

export enum Benchmarks {
    Member = 1,
    FirstChild = 0.9,
    SecondChild = 0.8,
    ThirdChild = 0.7,
    FourthChildAndAbove = 0.6
}

export enum BalanceTaxPercent {
    High = 40 / 100
}


export enum ChildrenTypes {
    Infant = 'infant',
    Toddler = 'toddler',
    Elementary = 'elementary',
    HighSchool = 'highSchool'
}

export const KINDERGARTEN_EXPENSE_PERCENT = 35 / 100;
export enum Kindergartens {
    Pashosh = 3700,
    Ofer = 3400,
    Savion = 2780,
    Oren = 2400
}

export const FORMAL_SCHOOL_EXPENSE_PERCENT = 100 / 100;
export const INFORMAL_SCHOOL_EXPENSE_PERCENT = 20 / 100;
export enum Schools {
    InFormalHighSchool = 700,
    FormalHighSchool = 280,
    InFormalElementary = 1600,
    FormalElementary = 230
}

export enum ChildrenAllowance {
    FirstOrFifthAndABove = 164,
    SecondToFourthChild = 207,
}