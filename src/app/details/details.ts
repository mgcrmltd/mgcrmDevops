
export interface IDevopsDetailsService<T> {
    getDevopsDetails():Promise<T>;
    detailsAvailable():Promise<boolean>;
    save(details:DevopsDetails);
}

export class DevopsDetails{
    devopsUrl: string;    
    projectName: string;
    personalToken: string;
    teamName: string;
}