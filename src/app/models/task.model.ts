export interface Task {
    id: number;
    title: string;
    priority: number;
    parentTaskId: number;    
    parentTask: string;    
    startDate: Date;
    endDate: Date;
    done: boolean;
}
