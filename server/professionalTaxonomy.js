/**
 * Multi-domain professional skills taxonomy and role inference.
 * Supports IT, engineering, medical, business, and other CV fields.
 */

export const PROFESSIONAL_SKILLS_TAXONOMY = [
  // —— IT & Software ——
  { name: 'React.js', category: 'IT & Software', keywords: ['react', 'react.js', 'reactjs'] },
  { name: 'JavaScript', category: 'IT & Software', keywords: ['javascript', 'js', 'es6'] },
  { name: 'TypeScript', category: 'IT & Software', keywords: ['typescript', 'ts'] },
  { name: 'Node.js', category: 'IT & Software', keywords: ['node', 'node.js', 'nodejs', 'express'] },
  { name: 'Python', category: 'IT & Software', keywords: ['python', 'py'] },
  { name: 'Java', category: 'IT & Software', keywords: ['java', 'spring boot', 'spring'] },
  { name: 'SQL', category: 'IT & Software', keywords: ['sql', 'mysql', 'postgresql', 'postgres'] },
  { name: 'Machine Learning', category: 'IT & Software', keywords: ['machine learning', 'ml', 'deep learning', 'tensorflow', 'pytorch'] },
  { name: 'AWS Cloud', category: 'IT & Software', keywords: ['aws', 'amazon web services', 'ec2', 's3'] },
  { name: 'Docker', category: 'IT & Software', keywords: ['docker', 'kubernetes', 'k8s'] },
  { name: 'REST APIs', category: 'IT & Software', keywords: ['rest', 'api', 'restful'] },
  { name: 'Git & GitHub', category: 'IT & Software', keywords: ['git', 'github', 'gitlab'] },

  // —— Civil & Structural Engineering ——
  { name: 'AutoCAD', category: 'Civil Engineering', keywords: ['autocad', 'cad drafting'] },
  { name: 'Structural Design', category: 'Civil Engineering', keywords: ['structural design', 'structural analysis', 'staad pro', 'staad'] },
  { name: 'Site Supervision', category: 'Civil Engineering', keywords: ['site supervision', 'site engineer', 'construction site'] },
  { name: 'Quantity Surveying', category: 'Civil Engineering', keywords: ['quantity surveying', 'boq', 'cost estimation'] },
  { name: 'Concrete Technology', category: 'Civil Engineering', keywords: ['concrete', 'reinforced concrete', 'rcc'] },
  { name: 'Highway Engineering', category: 'Civil Engineering', keywords: ['highway', 'road design', 'pavement'] },
  { name: 'Revit / BIM', category: 'Civil Engineering', keywords: ['revit', 'bim', 'building information modeling'] },

  // —— Mechanical & Electrical Engineering ——
  { name: 'Mechanical Design', category: 'Mechanical Engineering', keywords: ['mechanical design', 'solidworks', 'catia', 'ansys'] },
  { name: 'HVAC Systems', category: 'Mechanical Engineering', keywords: ['hvac', 'heating ventilation'] },
  { name: 'Thermodynamics', category: 'Mechanical Engineering', keywords: ['thermodynamics', 'heat transfer'] },
  { name: 'Electrical Systems', category: 'Electrical Engineering', keywords: ['electrical systems', 'power systems', 'switchgear'] },
  { name: 'PLC Programming', category: 'Electrical Engineering', keywords: ['plc', 'scada', 'automation'] },
  { name: 'Circuit Design', category: 'Electrical Engineering', keywords: ['circuit design', 'pcb', 'electronics'] },

  // —— Medical & Healthcare ——
  { name: 'Patient Care', category: 'Healthcare', keywords: ['patient care', 'bedside care', 'clinical care'] },
  { name: 'Nursing', category: 'Healthcare', keywords: ['nursing', 'registered nurse', 'staff nurse', ' rn '] },
  { name: 'Clinical Diagnosis', category: 'Healthcare', keywords: ['diagnosis', 'clinical examination', 'mbbs', 'md '] },
  { name: 'Surgery', category: 'Healthcare', keywords: ['surgery', 'surgical', 'operating room', 'ot '] },
  { name: 'Pharmacy', category: 'Healthcare', keywords: ['pharmacy', 'pharmacist', 'pharmacology', 'dispensing'] },
  { name: 'Medical Laboratory', category: 'Healthcare', keywords: ['lab technician', 'medical laboratory', 'pathology', 'hematology'] },
  { name: 'Radiology', category: 'Healthcare', keywords: ['radiology', 'x-ray', 'mri', 'ct scan'] },
  { name: 'Physiotherapy', category: 'Healthcare', keywords: ['physiotherapy', 'physical therapy', 'rehabilitation'] },
  { name: 'ICU / Emergency Care', category: 'Healthcare', keywords: ['icu', 'emergency medicine', 'trauma care', 'critical care'] },
  { name: 'Electronic Health Records', category: 'Healthcare', keywords: ['ehr', 'emr', 'hospital information system', 'his'] },

  // —— Business, Finance & Admin ——
  { name: 'Accounting', category: 'Finance', keywords: ['accounting', 'accountant', 'bookkeeping', 'ifrs', 'gaap'] },
  { name: 'Financial Analysis', category: 'Finance', keywords: ['financial analysis', 'financial modeling', 'cfa'] },
  { name: 'Digital Marketing', category: 'Marketing', keywords: ['digital marketing', 'seo', 'sem', 'social media marketing'] },
  { name: 'Human Resources', category: 'HR', keywords: ['human resources', 'hr management', 'recruitment', 'talent acquisition'] },
  { name: 'Project Management', category: 'Management', keywords: ['project management', 'pmp', 'prince2', 'agile', 'scrum'] },
  { name: 'Supply Chain', category: 'Operations', keywords: ['supply chain', 'logistics', 'procurement', 'inventory'] },
  { name: 'Sales & Business Development', category: 'Sales', keywords: ['sales', 'business development', 'b2b', 'client acquisition'] },

  // —— Education & General ——
  { name: 'Teaching & Training', category: 'Education', keywords: ['teaching', 'lecturer', 'professor', 'curriculum'] },
  { name: 'Research & Analysis', category: 'Research', keywords: ['research', 'data analysis', 'report writing'] },
  { name: 'Microsoft Office', category: 'General', keywords: ['microsoft office', 'excel', 'word', 'powerpoint'] },
  { name: 'Communication', category: 'Soft Skills', keywords: ['communication', 'presentation', 'interpersonal'] },
  { name: 'Leadership', category: 'Soft Skills', keywords: ['leadership', 'team lead', 'team management'] },
];

export function inferRoleFromResumeText(text, lines = []) {
  const lower = (text || '').toLowerCase();

  const roleRules = [
    [/medical doctor|physician|mbbs|general practitioner|\bmd\b|surgeon|consultant physician/, 'Medical Doctor'],
    [/registered nurse|staff nurse|nursing officer|\brn\b|bsn/, 'Registered Nurse'],
    [/pharmacist|pharmacy|d\.pharm|b\.pharm/, 'Pharmacist'],
    [/dentist|dental surgeon|bds/, 'Dentist'],
    [/physiotherapist|physical therapist|dpt/, 'Physiotherapist'],
    [/lab technician|medical laboratory|mlt/, 'Medical Lab Technician'],
    [/radiologist|radiology technologist/, 'Radiology Specialist'],
    [/civil engineer|structural engineer|site engineer/, 'Civil Engineer'],
    [/mechanical engineer|mechanical design engineer/, 'Mechanical Engineer'],
    [/electrical engineer|power engineer/, 'Electrical Engineer'],
    [/chemical engineer|process engineer/, 'Chemical Engineer'],
    [/petroleum engineer|reservoir engineer/, 'Petroleum Engineer'],
    [/\barchitect\b(?!ural)/, 'Architect'],
    [/chartered accountant|\bca\b|accountant|audit manager/, 'Accountant'],
    [/marketing manager|digital marketing|brand manager/, 'Marketing Specialist'],
    [/human resources|hr manager|hr officer|recruiter/, 'HR Specialist'],
    [/project manager|program manager|\bpmp\b/, 'Project Manager'],
    [/full stack|fullstack/, 'Full Stack Developer'],
    [/frontend|react developer/, 'Frontend Developer'],
    [/backend|node\.js developer/, 'Backend Developer'],
    [/data scientist|data analyst|business analyst/, 'Data Analyst'],
    [/machine learning|ai engineer|ml engineer/, 'AI / ML Engineer'],
    [/devops|cloud engineer|sre/, 'DevOps Engineer'],
    [/software engineer|software developer|programmer/, 'Software Engineer'],
    [/teacher|lecturer|professor|instructor/, 'Educator'],
    [/lawyer|legal counsel|advocate|attorney/, 'Legal Professional'],
  ];

  for (const [pattern, role] of roleRules) {
    if (pattern.test(lower)) return role;
  }

  for (const line of lines.slice(0, 10)) {
    if (
      line.length > 4 &&
      line.length < 70 &&
      /engineer|developer|doctor|nurse|analyst|manager|specialist|consultant|technician|officer|architect|designer|pharmacist|accountant|teacher|surgeon/i.test(line) &&
      !/@/.test(line) &&
      !/^\d/.test(line)
    ) {
      return line.replace(/\s{2,}/g, ' ').trim();
    }
  }

  return 'Professional';
}

export function computeTitleAlignment(jobTitle, candidateTitle) {
  const jobWords = (jobTitle || '').toLowerCase().split(/\W+/).filter((w) => w.length > 3);
  const candWords = (candidateTitle || '').toLowerCase().split(/\W+/).filter((w) => w.length > 3);
  if (jobWords.length === 0 || candWords.length === 0) return 0.5;

  const overlap = jobWords.filter((w) =>
    candWords.some((c) => c.includes(w) || w.includes(c))
  ).length;

  return Math.min(1, 0.35 + (overlap / Math.max(jobWords.length, 1)) * 0.65);
}

export function getDefaultSkillsForText(text, lines) {
  const role = inferRoleFromResumeText(text, lines);
  return [
    { name: role, rating: 88, category: 'Professional Role' },
    { name: 'Communication & Teamwork', rating: 85, category: 'Core Skills' },
  ];
}
