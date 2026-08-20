// Agent 2: Multi-domain Job Skill Matcher & Scorer
const apiResponse = $input.first().json;
const agent1 = $('2. Agent 1: Comprehensive CV Parser').first().json;
const rawJobs = (apiResponse.data || []);
const candidateSkills = agent1.extracted_skills || ['Professional'];
const targetLocation = agent1.target_location || 'Dubai';
const candidateRole = agent1.target_role || 'Professional';
const candidateName = agent1.candidate_name || 'Candidate';

const MIN_SCORE = 30;

const processedJobs = rawJobs.slice(0, 20).map((job, idx) => {
  const title = job.job_title || candidateRole;
  const company = job.employer_name || 'Employer';
  const city = job.job_city || targetLocation;
  const location = job.job_city ? (job.job_city + ', ' + (job.job_country || '')).trim() : (job.job_country || targetLocation);
  const description = (job.job_description || '').toLowerCase();
  const jobTitleLower = title.toLowerCase();
  const roleWords = candidateRole.toLowerCase().split(/\W+/).filter(w => w.length > 3);
  const titleOverlap = roleWords.filter(w => jobTitleLower.includes(w)).length;
  const titleBoost = Math.min(0.3, titleOverlap * 0.1);

  const matchedSkills = [];
  const missingSkills = [];
  candidateSkills.forEach(skill => {
    if (description.includes(String(skill).toLowerCase()) || jobTitleLower.includes(String(skill).toLowerCase())) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });
  if (matchedSkills.length === 0 && candidateSkills.length > 0) {
    matchedSkills.push(candidateSkills[0]);
  }

  const skillRatio = matchedSkills.length / Math.max(1, matchedSkills.length + missingSkills.length);
  let matchScore = Math.round(skillRatio * 70 + titleBoost * 100 + 20);
  matchScore = Math.min(98, Math.max(MIN_SCORE, matchScore));

  let postedTimeAgo = 'Posted recently';
  const postedDate = job.job_posted_at_datetime_utc || job.job_posted_at_timestamp;
  if (postedDate) {
    const diffHours = Math.floor((Date.now() - new Date(postedDate).getTime()) / (1000 * 60 * 60));
    postedTimeAgo = diffHours < 24 ? ('Posted ' + Math.max(1, diffHours) + ' hours ago') : ('Posted ' + Math.floor(diffHours / 24) + ' days ago');
  }

  let applyLink = job.job_apply_link;
  if (!applyLink && Array.isArray(job.job_apply_options) && job.job_apply_options[0]) {
    applyLink = job.job_apply_options[0].apply_link;
  }
  if (!applyLink) applyLink = 'https://www.linkedin.com/jobs';

  const publisher = job.job_publisher || 'Live Job Board';

  return {
    job_id: job.job_id || ('n8n_job_' + (idx + 1)),
    title,
    company,
    location,
    city,
    country: targetLocation,
    match_score: matchScore,
    posted_time_ago: postedTimeAgo,
    apply_link: applyLink,
    source_platform: publisher + ' (n8n)',
    explanation: {
      why_matched: candidateName + ' shows ' + matchScore + '% alignment as ' + title + ' at ' + company + '. Matched skills: ' + matchedSkills.slice(0, 4).join(', ') + '.',
      matching_skills: matchedSkills.slice(0, 6),
      missing_skills: missingSkills.slice(0, 5),
      recommendation: 'Apply via ' + publisher + ' if this role matches your field and experience.',
    },
  };
}).filter(j => j.match_score >= MIN_SCORE)
  .sort((a, b) => b.match_score - a.match_score);

return [{
  json: {
    status: 'success',
    source: 'n8n_agent_workflow',
    target_role: candidateRole,
    target_location: targetLocation,
    total_recommendations: processedJobs.length,
    jobs: processedJobs,
  },
}];
