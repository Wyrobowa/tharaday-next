import { BadgeIntent } from '../../../ds-creator';

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