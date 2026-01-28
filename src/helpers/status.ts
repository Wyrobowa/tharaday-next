import { BadgeIntent } from '@wyrobowa/design-system';

export const getStatusBadgeIntent = (status: string): BadgeIntent => {
    switch (status) {
        case 'active':
            return 'success';
        case 'suspended':
            return 'warning';
        case 'removed':
            return 'danger';
        case 'inactive':
        default:
            return 'neutral';
    }
};