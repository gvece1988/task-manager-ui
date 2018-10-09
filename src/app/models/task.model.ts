export interface Task {
    id: number;
    title: string;
    priority: number;
    parentTaskId: number;    
    parentTask: string;    
    startDate: string;
    endDate: Date;
    done: boolean;
}
