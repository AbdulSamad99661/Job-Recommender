import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const wf = JSON.parse(fs.readFileSync(path.join(root, 'n8n-job-recommender-workflow.json'), 'utf8'));
const agent1 = fs.readFileSync(path.join(root, 'n8n-agent1-parser.js'), 'utf8');
const agent2 = fs.readFileSync(path.join(root, 'n8n-agent2-matcher.js'), 'utf8');

wf.nodes.find((n) => n.id === 'agent-1-parser').parameters.jsCode = agent1;
wf.nodes.find((n) => n.id === 'agent-2-matcher').parameters.jsCode = agent2;

fs.writeFileSync(path.join(root, 'n8n-job-recommender-workflow.json'), JSON.stringify(wf, null, 2));
console.log('Updated n8n-job-recommender-workflow.json');
