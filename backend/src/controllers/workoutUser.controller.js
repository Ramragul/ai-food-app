import {
  getClientWorkoutAssignmentsService,
  getClientWorkoutAssignmentByIdService,
} from "../services/workoutClient.service.js";

import {
  startWorkoutSessionService,
  getWorkoutSessionService,
  getActiveWorkoutSessionService,
  pauseWorkoutSessionService,
  resumeWorkoutSessionService,
  completeWorkoutSetService,
  skipWorkoutSetService,
  skipWorkoutRestService,
  extendWorkoutRestService,
  finishWorkoutSessionService,
  getWorkoutSessionHistoryService,
} from "../services/workoutExecution.service.js";

const sendError = (res, error, fallbackStatus = 400) => {
  const status = error?.code === "ACTIVE_WORKOUT_EXISTS"
    ? 409
    : error?.code === "REST_ACTIVE"
      ? 409
      : fallbackStatus;

  return res.status(status).json({
    success: false,
    error: error?.message || "Something went wrong.",
    code: error?.code,
    activeSessionId: error?.activeSessionId,
    restRemainingSeconds: error?.restRemainingSeconds,
  });
};

export const getMyClientWorkoutAssignments = async (req, res) => {
  try {
    const data = await getClientWorkoutAssignmentsService(req.user.id);
    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return sendError(res, error, 500);
  }
};

export const getMyClientWorkoutAssignmentById = async (req, res) => {
  try {
    const data = await getClientWorkoutAssignmentByIdService(
      req.user.id,
      Number(req.params.id)
    );
    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return sendError(res, error, 404);
  }
};

export const startWorkoutSession = async (req, res) => {
  try {
    const data = await startWorkoutSessionService(
      req.user.id,
      Number(req.params.assignmentId)
    );
    return res.status(201).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return sendError(res, error);
  }
};

export const getActiveWorkoutSession = async (req, res) => {
  try {
    const data = await getActiveWorkoutSessionService(req.user.id);
    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return sendError(res, error, 500);
  }
};

export const getWorkoutSession = async (req, res) => {
  try {
    const data = await getWorkoutSessionService(req.user.id, Number(req.params.id));
    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return sendError(res, error, 404);
  }
};

export const pauseWorkoutSession = async (req, res) => {
  try {
    const data = await pauseWorkoutSessionService(req.user.id, Number(req.params.id));
    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return sendError(res, error);
  }
};

export const resumeWorkoutSession = async (req, res) => {
  try {
    const data = await resumeWorkoutSessionService(req.user.id, Number(req.params.id));
    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return sendError(res, error);
  }
};

export const completeWorkoutSet = async (req, res) => {
  try {
    const data = await completeWorkoutSetService(
      req.user.id,
      Number(req.params.id),
      req.body || {}
    );
    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return sendError(res, error);
  }
};

export const skipWorkoutSet = async (req, res) => {
  try {
    const data = await skipWorkoutSetService(
      req.user.id,
      Number(req.params.id),
      req.body || {}
    );
    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return sendError(res, error);
  }
};

export const skipWorkoutRest = async (req, res) => {
  try {
    const data = await skipWorkoutRestService(req.user.id, Number(req.params.id));
    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return sendError(res, error);
  }
};

export const extendWorkoutRest = async (req, res) => {
  try {
    const data = await extendWorkoutRestService(
      req.user.id,
      Number(req.params.id),
      Number(req.body?.seconds ?? 30)
    );
    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return sendError(res, error);
  }
};

export const finishWorkoutSession = async (req, res) => {
  try {
    const data = await finishWorkoutSessionService(req.user.id, Number(req.params.id));
    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return sendError(res, error);
  }
};

export const getWorkoutSessionHistory = async (req, res) => {
  try {
    const data = await getWorkoutSessionHistoryService(
      req.user.id,
      Number(req.query.limit ?? 30)
    );
    return res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return sendError(res, error, 500);
  }
};