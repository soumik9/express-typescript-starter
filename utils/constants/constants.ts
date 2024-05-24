import { ENUM_PERMISSION_NAMES, ENUM_ROLE } from "../enums/rolePermissionEnum";

export const organizerDefaultRole = [
    {
        name: ENUM_ROLE.SUPER_OWNER,
        permissions: [ENUM_PERMISSION_NAMES.ALL]
    },
    {
        name: ENUM_ROLE.OWNER,
        permissions: []
    },
    {
        name: ENUM_ROLE.ACCOUNTANT,
        permissions: []
    },
    {
        name: ENUM_ROLE.MARKETING,
        permissions: []
    },
    {
        name: ENUM_ROLE.CUSTOMER_SUPPORT,
        permissions: []
    },
]

// pagination props
export const paginationProps: string[] = ['page', 'limit', 'sortBy', 'sortOrder'];