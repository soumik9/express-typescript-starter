export enum ENUM_ROLE {
    SUPER_OWNER = 'super-owner',
    OWNER = 'owner',
    ACCOUNTANT = 'accountant',
    MARKETING = 'marketing',
    CUSTOMER_SUPPORT = 'customer-support'
}

export enum ENUM_PERMISSION_NAMES {
    ALL = 'all-permissions',
    DASHBOARD = 'dashboard',
    WEB_MANAGEMENT = 'web-management',
    ACTIVITIES_AND_PROVIDERS = 'activities-and-providers',
    END_CLIENTS = 'end-clients',
    BOOKINGS = 'bookings',
    MESSEGE = 'message',
    REVIEWS_MANAGEMENT = 'reviews',
    ANALYTICS_AND_FINANCE = 'analytics-and-finance',
}

export const RoleEnumValues = Object.values(ENUM_ROLE);
export const PermissionEnumValues = Object.values(ENUM_PERMISSION_NAMES);