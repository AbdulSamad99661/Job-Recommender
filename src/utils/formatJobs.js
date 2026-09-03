import { processedJobMatchesLocation } from '../data/locationUtils';

export function formatJobsFromResponse(response, location, roleOrSkill = 'Software Engineer') {
  if (!response?.jobs?.length) return [];
  return response.jobs
    .map((j, idx) => ({
      id: j.id || j.job_id || `job_${idx}`,
      title: j.title || `${roleOrSkill} - ${location}`,
      company: j.company || 'Top Employer',
      city: j.city || j.location || location,
      country: j.country || location,
      location: j.location || location,
      type: j.is_remote ? 'Remote' : 'Full-time',
      salary: j.salary || 'Competitive Salary',
      postedDate: j.posted_time_ago || j.posted_date || 'Recently',
      matchScore: typeof j.match_score === 'number' ? j.match_score : (typeof j.matchScore === 'number' ? j.matchScore : 50),
      rationale: j.explanation?.why_matched || j.whyMatched || `Skill match evaluation for ${location}.`,
      matchedSkills: j.explanation?.matching_skills || j.matchedSkills || [],
      missingSkills: j.explanation?.missing_skills || j.missingSkills || [],
      applyLink: j.apply_link || j.job_apply_link || 'https://linkedin.com',
      recommendation: j.explanation?.recommendation || 'High recommendation to apply.',
      source_platform: j.source_platform,
      dataSource: response.data_source,
      isRemote: j.is_remote,
    }))
    .filter((job) => job.matchScore >= 30)
    .filter((job) => processedJobMatchesLocation(job, location))
    .sort((a, b) => b.matchScore - a.matchScore);
}
