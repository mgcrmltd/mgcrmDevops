
export interface IDevopsDetailsService<T> {
    getDevopsDetails():Promise<T>;
    detailsAvailable():Promise<boolean>;
    save(details:T);
}

export class DevopsDetails{
    devopsUrl: string;    
    projectName: string;
    personalToken: string;
    teamName: string;
}