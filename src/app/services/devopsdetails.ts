
export interface IDevopsDetailsService<T> {
    getDevopsDetails(): Promise<T>;
    detailsAvailable(): Promise<boolean>;
    save(details: T);
}

export interface IDevopsDetailsServiceStrategy<T> extends IDevopsDetailsService<T> {
    storageService: IDevopsDetailsService<T>;
    envService: IDevopsDetailsService<T>;
}

export interface IStorageService {
    storageKey: string;
}

export class DevopsDetailsServiceStrategyBase<T> implements IDevopsDetailsServiceStrategy<T>{
    storageService: IDevopsDetailsService<T>;
    envService: IDevopsDetailsService<T>;

    constructor(storage: IDevopsDetailsService<T>, env: IDevopsDetailsService<T>){
        this.storageService = storage;
        this.envService = env;
    }

    async getDevopsDetails(): Promise<T> {
        if (await this.storageService.detailsAvailable()) {
            return await this.storageService.getDevopsDetails();
        }
        else if (await this.envService.detailsAvailable()) {
            return await this.envService.getDevopsDetails();
        }
        return null;
    }
    async detailsAvailable(): Promise<boolean> {
        let avail = await this.storageService.detailsAvailable();
        if (avail) return true;
        return await this.envService.detailsAvailable();
    }
    save(details: T) {
        this.storageService.save(details);
    }


}