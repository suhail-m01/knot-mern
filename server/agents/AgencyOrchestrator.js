/**
 * AgencyOrchestrator.js
 * 
 * Inspired by "Agents Orchestrator" from msitarzewski/agency-agents.
 * Orchestrates multi-agent harvesting, coordinates continuous 30-minute real-time polling,
 * and broadcasts telemetry via Server-Sent Events (SSE).
 */

import { communityHarvesterAgent } from './CommunityHarvesterAgent.js';
import { eventHarvesterAgent } from './EventHarvesterAgent.js';
import { dataConsolidationAgent } from './DataConsolidationAgent.js';
import { realtimeService } from '../services/realtimeService.js';

export class AgencyOrchestrator {
  constructor() {
    this.name = 'Agents Orchestrator';
    this.emoji = '🎛️';
    this.role = 'Autonomous Multi-Agent Pipeline & Real-Time Scheduler';
    this.isRunning = false;
    this.lastRunAt = null;
    this.nextRunAt = null;
    this.telemetryLogs = [];
    this.intervalId = null;
    this.intervalMinutes = 30; // 30-minute continuous polling cycle
  }

  log(agentName, message, data = null) {
    const entry = {
      timestamp: new Date().toISOString(),
      agent: agentName,
      message,
      data,
    };
    this.telemetryLogs.unshift(entry);
    if (this.telemetryLogs.length > 100) this.telemetryLogs.pop();

    console.log(`[Agency Orchestrator] [${agentName}] ${message}`);

    // Stream telemetry live to frontend clients
    try {
      realtimeService.emit('agent_log', entry);
    } catch (_) {}
  }

  /**
   * Runs one complete autonomous harvesting and consolidation cycle.
   */
  async runCycle(reason = 'scheduled') {
    if (this.isRunning) {
      this.log(this.name, 'Harvesting cycle already in progress, skipping duplicate call.');
      return { status: 'already_running', lastRunAt: this.lastRunAt };
    }

    this.isRunning = true;
    const startTime = Date.now();
    this.log(this.name, `Initiating autonomous multi-agent extraction cycle (trigger: ${reason})...`);

    try {
      // Phase 1: Community Harvester Agent
      this.log('CommunityHarvesterAgent', 'Extracting developer hubs across Discord, Unstop, Meetup, and Luma...');
      const communityResult = await communityHarvesterAgent.harvestAll();
      this.log('CommunityHarvesterAgent', `Extracted ${communityResult.totalHarvested} verified communities across 4 platforms.`);

      // Phase 2: Event & Workshop Harvester Agent
      this.log('EventHarvesterAgent', 'Extracting Hackathons, Workshops, Webinars, and Meetups across Unstop, Devfolio, Luma, HasGeek, MLH...');
      const eventResult = await eventHarvesterAgent.harvestAll();
      this.log('EventHarvesterAgent', `Extracted ${eventResult.totalEventsHarvested} workshops/meetups and ${eventResult.totalHackathonsHarvested} hackathons.`);

      // Phase 3: Data Consolidation & Quality Agent
      this.log('DataConsolidationAgent', 'Normalizing schemas, deduplicating records, and committing to production database...');
      const consolidationResult = await dataConsolidationAgent.consolidateAndPersist({
        communities: communityResult.communities,
        events: eventResult.events,
        hackathons: eventResult.hackathons,
      });
      this.log('DataConsolidationAgent', `Committed ${consolidationResult.counts.total} items (Communities: ${consolidationResult.counts.communities}, Events: ${consolidationResult.counts.events}, Hackathons: ${consolidationResult.counts.hackathons}).`);

      const durationMs = Date.now() - startTime;
      this.lastRunAt = new Date().toISOString();
      this.nextRunAt = new Date(Date.now() + this.intervalMinutes * 60 * 1000).toISOString();
      this.isRunning = false;

      const completionSummary = {
        success: true,
        status: 'completed',
        durationMs,
        lastRunAt: this.lastRunAt,
        nextRunAt: this.nextRunAt,
        counts: consolidationResult.counts,
        platforms: {
          discord: communityResult.platforms.discord,
          unstop: communityResult.platforms.unstop + 1, // communities + hackathons
          meetup: communityResult.platforms.meetup,
          luma: communityResult.platforms.luma,
          devfolio: 1,
          hasgeek: 1,
          mlh: 1,
        },
      };

      this.log(this.name, `Autonomous cycle completed in ${durationMs}ms. Next run scheduled at ${this.nextRunAt}.`);
      return completionSummary;
    } catch (err) {
      this.isRunning = false;
      this.log(this.name, `Error during agency harvesting cycle: ${err.message}`);
      throw err;
    }
  }

  /**
   * Initializes continuous real-time 30-minute background polling.
   */
  startContinuousPolling() {
    if (this.intervalId) clearInterval(this.intervalId);

    this.log(this.name, `Starting continuous background agent scheduler (${this.intervalMinutes}m interval).`);
    // Run initial cycle right away
    this.runCycle('initial_boot').catch((err) => {
      console.error('[Agency Orchestrator Boot Error]', err);
    });

    // Schedule periodic execution
    this.intervalId = setInterval(() => {
      this.runCycle('interval_timer').catch((err) => {
        console.error('[Agency Orchestrator Interval Error]', err);
      });
    }, this.intervalMinutes * 60 * 1000);
  }

  getStatus() {
    return {
      name: this.name,
      emoji: this.emoji,
      role: this.role,
      isRunning: this.isRunning,
      intervalMinutes: this.intervalMinutes,
      lastRunAt: this.lastRunAt,
      nextRunAt: this.nextRunAt,
      recentLogs: this.telemetryLogs.slice(0, 15),
    };
  }
}

export const agencyOrchestrator = new AgencyOrchestrator();
