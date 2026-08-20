// Agent 1: Multi-domain CV Parser (IT, engineering, medical, business, etc.)
const input = $input.first().json;
const body = input.body || input;
const text = input.text || body.text || '';
const location = body.location || 'Dubai';
const filename = body.filename || 'Uploaded_Resume.pdf';
const lower = text.toLowerCase();
const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);

let name = filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
for (let i = 0; i < Math.min(5, lines.length); i++) {
  const line = lines[i];
  if (line.length > 2 && line.length < 35 && !line.includes('@') && !/\d/.test(line) && !/contact|resume|education|skills/i.test(line)) {
    name = line;
    break;
  }
}

const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
const email = emailMatch ? emailMatch[0].trim() : 'candidate@uploaded-cv.org';
const phoneMatch = text.match(/(\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}|\+?\d{10,13}/);
const phone = phoneMatch ? phoneMatch[0].trim() : 'Contact via Email';

const roleRules = [
  [/medical doctor|physician|mbbs|surgeon/, 'Medical Doctor'],
  [/registered nurse|staff nurse|nursing/, 'Registered Nurse'],
  [/pharmacist|pharmacy|d\.pharm/, 'Pharmacist'],
  [/civil engineer|structural engineer|site engineer/, 'Civil Engineer'],
  [/mechanical engineer/, 'Mechanical Engineer'],
  [/electrical engineer/, 'Electrical Engineer'],
  [/accountant|chartered accountant|\bca\b/, 'Accountant'],
  [/software engineer|software developer|programmer/, 'Software Engineer'],
  [/data analyst|business analyst/, 'Data Analyst'],
  [/project manager|\bpmp\b/, 'Project Manager'],
];
let role = 'Professional';
for (const [pattern, label] of roleRules) {
  if (pattern.test(lower)) { role = label; break; }
}
if (role === 'Professional') {
  for (const line of lines.slice(0, 10)) {
    if (line.length > 4 && line.length < 70 && /engineer|doctor|nurse|analyst|manager|specialist|technician|accountant|pharmacist/i.test(line) && !/@/.test(line)) {
      role = line;
      break;
    }
  }
}

const taxonomy = [
  ['React.js', ['react', 'react.js']],
  ['JavaScript', ['javascript', 'js']],
  ['Python', ['python']],
  ['Node.js', ['node.js', 'nodejs']],
  ['SQL', ['sql', 'mysql', 'postgresql']],
  ['AutoCAD', ['autocad', 'cad']],
  ['Structural Design', ['structural design', 'staad']],
  ['Patient Care', ['patient care', 'clinical care']],
  ['Nursing', ['nursing', 'registered nurse']],
  ['Clinical Diagnosis', ['diagnosis', 'mbbs', 'clinical examination']],
  ['Pharmacy', ['pharmacy', 'pharmacist']],
  ['Medical Laboratory', ['lab technician', 'pathology']],
  ['Mechanical Design', ['mechanical design', 'solidworks']],
  ['Electrical Systems', ['electrical systems', 'power systems']],
  ['Accounting', ['accounting', 'accountant', 'ifrs']],
  ['Project Management', ['project management', 'pmp']],
  ['Machine Learning', ['machine learning', 'deep learning']],
];

const extractedSkills = [];
taxonomy.forEach(([skill, keywords]) => {
  if (keywords.some(kw => lower.includes(kw))) extractedSkills.push(skill);
});

const skillsHeaderIdx = lines.findIndex(l => /skills|competencies|clinical skills|specialties|certifications/i.test(l));
if (skillsHeaderIdx !== -1) {
  lines.slice(skillsHeaderIdx + 1, skillsHeaderIdx + 5).forEach(line => {
    line.split(/[,•|;/]/).map(t => t.trim()).filter(t => t.length > 1 && t.length < 40).forEach(tok => {
      if (!extractedSkills.includes(tok)) extractedSkills.push(tok);
    });
  });
}

if (extractedSkills.length === 0) {
  extractedSkills.push(role, 'Communication & Teamwork');
}

return [{
  json: {
    candidate_name: name,
    candidate_email: email,
    candidate_phone: phone,
    target_location: location,
    target_role: role,
    extracted_skills: extractedSkills.slice(0, 20),
    search_query: role + ' in ' + location,
    extracted_at: new Date().toISOString(),
  },
}];
