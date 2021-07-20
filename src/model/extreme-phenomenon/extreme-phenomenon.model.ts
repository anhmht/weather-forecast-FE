export interface IExtremePhenomenonDetail {
    createBy?: string,
    createDate?: string,
    lastModifiedBy?: string,
    lastModifiedDate?: string,
    id: string,
    extremePhenomenonId?: string,
    name?: string,
    content?: string
}

export class ExtremePhenomenonDetail implements IExtremePhenomenonDetail {
    createBy?: string;
    createDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id: string;
    extremePhenomenonId?: string;
    name?: string;
    content?: string;

    constructor(option?: any) {
        option = option || {};
        Object.keys(option).forEach(key => {
            this[key] = option[key];
        });
        this.name = option.name || null;
        this.content = option.content || null;
    }
}

export interface IExtremePhenomenon {
    createBy?: string,
    createDate?: string,
    lastModifiedBy?: string,
    lastModifiedDate?: string,
    id: string,
    provinceId?: number,
    districtId?: string,
    date?: string,
    provinceName?: string,
    districtName?: string,
    details?: IExtremePhenomenonDetail[]
}

export class ExtremePhenomenon implements IExtremePhenomenon {
    createBy?: string;
    createDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id: string;
    provinceId?: number;
    districtId?: string;
    date?: string;
    provinceName?: string;
    districtName?: string;
    details?: IExtremePhenomenonDetail[]

    constructor(option?: any) {
        option = option || {};
        Object.keys(option).forEach(key => {
            this[key] = option[key];
        });
        this.provinceId = option.provinceId || null;
        this.districtId = option.districtId || null;
        this.date = option.date || null;
        this.provinceName = option.provinceName || "";
        this.districtName = option.districtName || "";
        this.details = option.details || [];
    }
}

export interface IExtremePhenomenonsSearchParams {
    limit: number,
    page: number,
    date?: string,
    provinceId?: number,
}

export class ExtremePhenomenonsSearchParams implements IExtremePhenomenonsSearchParams {
    limit: number;
    page: number;
    date?: string;
    provinceId?: number;

    constructor(option?: any) {
        this.limit = option.limit || 10;
        this.page = option.page || 1;
        this.date = option.date || null;
        this.provinceId = option.provinceId || null;
    }
}
