import { Question } from "@/types/question";

export const mockQuestions: Question[] = [
    {
        id: "q1",
        questionText: "How can we improve the application's loading speed?",
        assignedTo: {
            id: "u1",
            name: "Sarah Chen",
            email: "sarah.chen@company.com",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
        },
        status: "in-progress",
        dueDate: "2024-12-15"
    },
    {
        id: "q2",
        questionText: "When will the new authentication system be ready?",
        assignedTo: null,
        status: "unassigned",
        dueDate: "2024-12-20"
    },
    {
        id: "q3",
        questionText: "Can we implement dark mode for the dashboard?",
        assignedTo: {
            id: "u2",
            name: "Alex Thompson",
            email: "alex.t@company.com",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
        },
        status: "open",
        dueDate: "2024-12-25"
    },
    {
        id: "q4",
        questionText: "What's the plan for migrating the database?",
        assignedTo: {
            id: "u3",
            name: "Maria Garcia",
            email: "maria.g@company.com",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
        },
        status: "completed",
        dueDate: "2024-12-10"
    },
    {
        id: "q5",
        questionText: "How should we handle error logging in production?",
        assignedTo: {
            id: "u4",
            name: "James Wilson",
            email: "james.w@company.com",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
        },
        status: "in-progress",
        dueDate: "2024-12-30"
    }
];