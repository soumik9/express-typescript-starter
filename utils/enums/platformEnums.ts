export enum ENUM_SOCIAL_PLATFORM {
    FACEBOOK = 'facebook',
    TIKTOK = 'tiktok',
    INSTAGRAM = 'instagram',
}

export enum ENUM_PGAE {
    HOME = 'home-page',
    ACTIVITY = 'activity-banners',
}

export enum ENUM_SECTIONS {
    TRENDING_ACTIVITIES = 'trending-activities',
    TOP_THINGS_TO_DO = 'top-things-to-do',
    POPULAR = 'popular',
    LIMITED_SPOTS = 'limited-spots',
}

export const SocialPlatformEnumValues = Object.values(ENUM_SOCIAL_PLATFORM);
export const PageEnumValues = Object.values(ENUM_PGAE);
export const SectionEnumValues = Object.values(ENUM_PGAE);