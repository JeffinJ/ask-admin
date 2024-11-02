export type User = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
};

export type Question = {
    id: string;
    questionText: string;
    assignedTo: User | null;
    status: 'open' | 'in-progress' | 'completed' | 'unassigned';
    dueDate: string;
};

export type QuestionT = {
    id: string;
    questionText: string;
    creationDate: string;
    lastUpdatedDate: string;
    delegatedEmail: string;
    questionHistory: string[];
    historyLog: string[];
    assignments: string[];
    singleAssignments: string[];
};