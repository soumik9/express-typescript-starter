export enum ENUM_ACTIVITY_TYPE {
    SEMESTER = 'semester',
    INDIVIDUAL = 'individual',
}

export enum ENUM_ACTIVITY_RANGE_TYPE {
    AGE = 'age',
    GRADE = 'grade',
}

export enum ENUM_DISCOUNT_TYPE {
    EURO = 'euro',
    PERCENTAGE = 'percentage',
}

export enum ENUM_STATUS_NAME {
    PENDING = 'pending',
    RUNNING = 'running',
    COMPLETED = 'completed',
}

export enum ENUM_PAYMENT_STATUS_NAME {
    PENDING = 'pending',
    PROCESSING = 'processing',
    COMPLETED = 'completed',
}

// converting all enum to arrays
export const ActivityTypeEnumValues = Object.values(ENUM_ACTIVITY_TYPE);

export const ActivityRangeTypeEnumValues = Object.values(ENUM_ACTIVITY_RANGE_TYPE);

export const DiscountTypeEnumValues = Object.values(ENUM_DISCOUNT_TYPE);

export const StatusEnumValues = Object.values(ENUM_STATUS_NAME);
export const PayemntStatusEnumValues = Object.values(ENUM_PAYMENT_STATUS_NAME);