export class GroupSum{
    header:string;
    tags:string[];
    estimated:number;
    completed:number;
    remaining:number;

    constructor(hdr:string, tgs: string[]){
        this.header = hdr;
        this.tags = tgs;
        this.estimated = 0;
        this.completed = 0;
        this.remaining = 0;
    }

    processDevopsTaskObject(obj: any){
        if(!this.isPartOfGroup(obj)) return;
        this.estimated += this.getValueOrZero(obj, 'Microsoft.VSTS.Scheduling.OriginalEstimate');
        this.completed += this.getValueOrZero(obj, 'Microsoft.VSTS.Scheduling.CompletedWork');
        this.remaining += this.getValueOrZero(obj, 'Microsoft.VSTS.Scheduling.RemainingWork');
    }

    getValueOrZero(obj: any, tag: string){
        if(typeof obj.fields[tag] === 'undefined') return 0;
        return <number>obj.fields[tag];
    }

    isPartOfGroup(obj:any): boolean{
        let title:string =  obj.fields['System.Title'].toLowerCase();
        let includes:boolean = false;
        this.tags.forEach(x =>{
            if(title.startsWith(x.toLowerCase())){
                includes = true;
            }
        })
        return includes;
    }
}