export class DevopsHoursGroupList{
    constructor(){
        this.groups = new Array();
    }
    groups: DevopsHoursGroup[];
}

export class DevopsHoursGroup{
    constructor(groupName: string, tagList:string[]){
        this.group = groupName;
        this.tags = new Array();
        tagList.forEach(x => {
            this.tags.push(new DevopsHoursTag(x))
        });
    }
    group: string;
    tags: DevopsHoursTag[];
}

export class DevopsHoursTag{
    constructor(name: string){
        this.tag = name;
    }
    tag: string;
}