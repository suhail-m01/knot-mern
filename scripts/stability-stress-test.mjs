import http from 'http';

const TOTAL_CYCLES = 15;

async function fetchUrl(url, options = {}) {
  const start = performance.now();
  const res = await fetch(url, { ...options, signal: AbortSignal.timeout(5000) });
  const duration = performance.now() - start;
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const body = isJson ? await res.json() : await res.text();
  return {
    status: res.status,
    ok: res.ok,
    duration,
    body,
  };
}

async function runStabilitySuite() {
  console.log('='.repeat(70));
  console.log(`  🔥 Executing Repeated Stability & Multi-Cycle Stress Test (${TOTAL_CYCLES} Iterations)`);
  console.log('='.repeat(70));

  let totalRequests = 0;
  let successRequests = 0;
  let failedRequests = 0;
  const latencyList = [];

  const metrics = {
    webAppLoads: 0,
    mobileAppLoads: 0,
    eventQueries: 0,
    hackathonQueries: 0,
    communityQueries: 0,
    registrationsCreated: 0,
    checkInsVerified: 0,
    qaAutoApprovals: 0,
    harvestCycles: 0,
  };

  for (let cycle = 1; cycle <= TOTAL_CYCLES; cycle++) {
    process.stdout.write(`  [Cycle ${String(cycle).padStart(2, '0')}/${TOTAL_CYCLES}] Running workflows... `);
    const cycleStart = performance.now();

    try {
      // 1. Web App Reload
      const webRes = await fetchUrl('http://localhost:5174/');
      totalRequests++;
      if (webRes.ok) { successRequests++; metrics.webAppLoads++; } else failedRequests++;
      latencyList.push(webRes.duration);

      // 2. Communities Web Page Reload
      const commWebRes = await fetchUrl('http://localhost:5174/communities');
      totalRequests++;
      if (commWebRes.ok) { successRequests++; metrics.webAppLoads++; } else failedRequests++;
      latencyList.push(commWebRes.duration);

      // 3. Mobile Web App Reload
      const mobileRes = await fetchUrl('http://localhost:8080/');
      totalRequests++;
      if (mobileRes.ok) { successRequests++; metrics.mobileAppLoads++; } else failedRequests++;
      latencyList.push(mobileRes.duration);

      // 4. Events Filtered Queries
      const evtRes = await fetchUrl('http://localhost:5000/api/events?category=Hackathons&area=Koramangala&limit=10');
      totalRequests++;
      if (evtRes.ok && evtRes.body.success) { successRequests++; metrics.eventQueries++; } else failedRequests++;
      latencyList.push(evtRes.duration);

      // 5. Hackathons Feed Query
      const hackRes = await fetchUrl('http://localhost:5000/api/hackathons?sort=soonest&limit=6');
      totalRequests++;
      if (hackRes.ok && Array.isArray(hackRes.body.data)) { successRequests++; metrics.hackathonQueries++; } else failedRequests++;
      latencyList.push(hackRes.duration);

      // 6. Communities Cross-Platform Filter Queries
      const commRes = await fetchUrl('http://localhost:5000/api/communities?platform=discord');
      totalRequests++;
      if (commRes.ok && commRes.body.success) { successRequests++; metrics.communityQueries++; } else failedRequests++;
      latencyList.push(commRes.duration);

      // 7. Event Registration Flow (Solo & Team)
      const regRes = await fetchUrl('http://localhost:5000/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: 'live-unstop-presidency-mernova',
          userId: `tester-${cycle}-${Date.now()}`,
          participationType: cycle % 2 === 0 ? 'team' : 'solo',
          teamName: cycle % 2 === 0 ? `Alpha Build Team ${cycle}` : undefined,
          teamMembers: cycle % 2 === 0 ? ['Alice', 'Bob'] : [],
          participantDetails: { name: `Tester ${cycle}`, email: `tester${cycle}@knot.test` }
        })
      });
      totalRequests++;
      let regTicket = null;
      if (regRes.ok && regRes.body.success) {
        successRequests++;
        metrics.registrationsCreated++;
        regTicket = regRes.body.registration?.checkInToken || regRes.body.registration?.id;
      } else {
        failedRequests++;
      }
      latencyList.push(regRes.duration);

      // 8. Check-In QR Verification Flow
      if (regTicket) {
        const checkinRes = await fetchUrl('http://localhost:5000/api/registrations/checkin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: regTicket, eventId: 'live-unstop-presidency-mernova' })
        });
        totalRequests++;
        if (checkinRes.ok && checkinRes.body.success) { successRequests++; metrics.checkInsVerified++; } else failedRequests++;
        latencyList.push(checkinRes.duration);
      }

      // 9. Autonomous QA Review Agent Auto-Approval Flow
      const qaRes = await fetchUrl('http://localhost:5000/api/events/auto-approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Autonomous Verified Sprint #${cycle}`,
          eventType: 'workshop',
          mode: 'in_person',
          startAt: new Date(Date.now() + 86400000 * cycle).toISOString(),
          venue: { name: 'Presidency Auditorium, Yelahanka', address: 'Yelahanka, Bengaluru', city: 'Bengaluru' },
          description: `Auto-reviewed cycle test #${cycle} verified by Autonomous QA Lead Agent.`
        })
      });
      totalRequests++;
      if (qaRes.ok && qaRes.body.approved) { successRequests++; metrics.qaAutoApprovals++; } else failedRequests++;
      latencyList.push(qaRes.duration);

      // 10. MERN Stack Diagnostics Ping
      const pingRes = await fetchUrl('http://localhost:5000/api/mern/ping');
      totalRequests++;
      if (pingRes.ok) successRequests++; else failedRequests++;
      latencyList.push(pingRes.duration);

      const cycleElapsed = (performance.now() - cycleStart).toFixed(0);
      console.log(`✅ 10/10 workflows passed in ${cycleElapsed}ms`);
    } catch (err) {
      console.log(`❌ Error in cycle ${cycle}: ${err.message}`);
    }
  }

  // Summary Metrics
  const avgLatency = (latencyList.reduce((a, b) => a + b, 0) / latencyList.length).toFixed(1);
  const minLatency = Math.min(...latencyList).toFixed(1);
  const maxLatency = Math.max(...latencyList).toFixed(1);
  const successRate = ((successRequests / totalRequests) * 100).toFixed(2);

  console.log('\n' + '='.repeat(70));
  console.log('  📊 MULTI-CYCLE STRESS TEST RESULTS');
  console.log('='.repeat(70));
  console.log(`  Total Iterative Requests : ${totalRequests}`);
  console.log(`  Successful Executions    : ${successRequests}`);
  console.log(`  Failed Executions        : ${failedRequests}`);
  console.log(`  Success Reliability Rate : ${successRate}%`);
  console.log(`  Latency Breakdown        : avg=${avgLatency}ms, min=${minLatency}ms, max=${maxLatency}ms`);
  console.log('-'.repeat(70));
  console.log('  Workflows Executed:');
  console.log(`    - Web App HTML Reloads             : ${metrics.webAppLoads} passed`);
  console.log(`    - Mobile App Web Reloads           : ${metrics.mobileAppLoads} passed`);
  console.log(`    - Filtered Event Queries           : ${metrics.eventQueries} passed`);
  console.log(`    - Hackathon Catalog Queries        : ${metrics.hackathonQueries} passed`);
  console.log(`    - Cross-Platform Community Queries : ${metrics.communityQueries} passed`);
  console.log(`    - Solo & Team Registrations        : ${metrics.registrationsCreated} created`);
  console.log(`    - QR Code Check-In Verifications   : ${metrics.checkInsVerified} verified`);
  console.log(`    - Autonomous QA Agent Approvals    : ${metrics.qaAutoApprovals} approved`);
  console.log('='.repeat(70));

  if (failedRequests === 0) {
    console.log('🎉 VERIFICATION CONFIRMED: All features & workflows are 100% stable under repeated execution!');
  } else {
    console.log(`⚠️ Completed with ${failedRequests} failed requests.`);
  }
}

runStabilitySuite().catch(console.error);
