export interface TreeNode {
  name: string;
  details?: string;
  children?: TreeNode[];
}

export interface PlannerPhase {
  title: string;
  duration?: string;
  tasks: PlannerTask[];
}

export interface PlannerTask {
  name: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  costEstimate?: string;
  location?: string;
}

export interface StrategicPlan {
  goal: string;
  phases: PlannerPhase[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface DecisionStep {
  type: 'question' | 'result';
  content: string;
  history?: { question: string; answer: 'Yes' | 'No' }[];
}