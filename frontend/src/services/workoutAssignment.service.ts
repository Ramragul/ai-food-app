import api from "../utils/api";

export interface UpdateWorkoutAssignmentPayload {
  organizationId: number;
  startDate: string;
  endDate?: string | null;
  scheduledDays: string[];
}

const ASSIGNMENTS_BASE = "/workout/assignments";

const unwrap = (response: any) =>
  response?.data?.data ?? response?.data ?? response;

export const updateWorkoutAssignment = async (
  assignmentId: number,
  payload: UpdateWorkoutAssignmentPayload
) => {
  if (!Number.isInteger(Number(assignmentId)) || Number(assignmentId) <= 0) {
    throw new Error("assignmentId is required.");
  }

  const response = await api.put(
    `${ASSIGNMENTS_BASE}/${assignmentId}`,
    payload
  );

  return unwrap(response);
};

export const deleteWorkoutAssignment = async (
  assignmentId: number,
  organizationId: number
) => {
  if (!Number.isInteger(Number(assignmentId)) || Number(assignmentId) <= 0) {
    throw new Error("assignmentId is required.");
  }

  const response = await api.delete(
    `${ASSIGNMENTS_BASE}/${assignmentId}`,
    {
      params: { organizationId },
    }
  );

  return unwrap(response);
};


export const deleteClientWorkoutAssignments = async (
  clientMemberId: number,
  organizationId: number
) => {
  if (!Number.isInteger(Number(clientMemberId)) || Number(clientMemberId) <= 0) {
    throw new Error("clientMemberId is required.");
  }

  const response = await api.delete(
    `/workout/assignments/client/${clientMemberId}`,
    {
      params: { organizationId },
    }
  );

  return unwrap(response);
};
