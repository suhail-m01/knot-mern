/**
 * agencyAgentController.js
 * 
 * Endpoints for monitoring and manually triggering the autonomous Agency Agents pipeline.
 */

import { agencyOrchestrator } from '../agents/AgencyOrchestrator.js';

export async function triggerHarvestCycle(req, res) {
  try {
    const triggerSource = req.body?.source || 'manual_request';
    const result = await agencyOrchestrator.runCycle(triggerSource);
    return res.status(200).json({
      success: true,
      message: 'Autonomous Agency Agents pipeline executed successfully',
      ...result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}

export function getAgentStatus(req, res) {
  const status = agencyOrchestrator.getStatus();
  return res.status(200).json({
    success: true,
    ...status,
  });
}

export function getAgentLogs(req, res) {
  return res.status(200).json({
    success: true,
    totalLogs: agencyOrchestrator.telemetryLogs.length,
    logs: agencyOrchestrator.telemetryLogs,
  });
}
