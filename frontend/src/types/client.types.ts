export interface CoachUpdate {
    id: number;

    organizationId: number;

    organizationName: string;

    coachId: number;

    coachName: string;

    coachRole: string;

    title: string;

    message: string;

    isRead: boolean;

    createdAt: string;
}